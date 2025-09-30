FROM oven/bun:1.1.17-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM deps AS build
COPY . .
RUN bun run build

FROM base AS runner
COPY --from=build /app/dist ./dist
COPY --from=build /app/scripts ./scripts
COPY package.json bun.lock ./
ENV PORT=8080
EXPOSE 8080
CMD ["bun", "scripts/serve-static.ts"]
