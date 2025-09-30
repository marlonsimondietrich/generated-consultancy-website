import { resolve, join } from "node:path";

async function resolveStaticRoot() {
  const cwd = process.cwd();
  const preferred = process.env.STATIC_ROOT ?? "dist";
  const candidates = [preferred, "dist/client", "dist/public"].map((candidate) =>
    resolve(cwd, candidate)
  );

  for (const candidate of candidates) {
    const probe = Bun.file(join(candidate, "index.html"));
    if (await probe.exists()) {
      return candidate;
    }
  }

  return resolve(cwd, preferred);
}

const distRoot = await resolveStaticRoot();
const fallbackFile = Bun.file(join(distRoot, "index.html"));
const defaultPort = 8080;
const port = Number.parseInt(process.env.PORT ?? "", 10) || defaultPort;

function toFilePath(pathname: string) {
  const normalized = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
  const filePath = resolve(distRoot, `.${normalized}`);
  if (!filePath.startsWith(distRoot)) {
    return null;
  }
  return filePath;
}

async function serveFile(pathname: string) {
  const filePath = toFilePath(pathname);
  if (!filePath) {
    return null;
  }
  const file = Bun.file(filePath);
  if (await file.exists()) {
    return file;
  }
  return null;
}

const server = Bun.serve({
  hostname: "0.0.0.0",
  port,
  async fetch(req) {
    const url = new URL(req.url);
    const method = req.method.toUpperCase();
    if (method !== "GET" && method !== "HEAD") {
      return new Response(null, { status: 405 });
    }

    const serving = await serveFile(url.pathname);
    if (serving) {
      const headers = serving.type
        ? { "Content-Type": serving.type }
        : undefined;
      return new Response(serving, headers ? { headers } : undefined);
    }

    if (await fallbackFile.exists()) {
      return new Response(fallbackFile, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(
  `Listening on http://0.0.0.0:${server.port} (serving ${distRoot.replace(process.cwd(), ".")})`
);
