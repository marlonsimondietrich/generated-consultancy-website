# Use a lightweight Bun image as the base
FROM oven/bun:1.1.17-alpine as builder
# Set the working directory inside the container
WORKDIR /app
# Copy package.json to leverage Docker cache for dependencies
COPY package.json ./
# Install dependencies, which will generate bun.lockb
RUN bun install --frozen-lockfile
# Copy the rest of the application files, including the generated bun.lockb
COPY . .
# Build the React application for production
RUN bun run build
# Use a smaller image for the final stage to serve the application
FROM oven/bun:1.1.17-alpine
# Set the working directory
WORKDIR /app
# Copy only the build output from the builder stage
COPY --from=builder /app/dist ./dist

# Install a simple static file server using bun (e.g., 'sirv-cli' or similar)
# For this example, we'll assume 'bun-serve' is a hypothetical static server you might install
# If you don't have a bun-specific static server, you can use a small Node.js image with 'serve' package,
# or add a simple custom server.js script to your project.
# Let's assume you've added 'sirv-cli' or a similar package to your devDependencies
# and will use `bunx sirv-cli` to run it.

# Command to install a static server if not already present in your project's bun.lockb
# If you prefer to install it globally in the container:
# RUN bun install -g sirv-cli # Or another static server like 'http-server'

# Expose the port the application will run on
EXPOSE 8080

# Command to run the application using a static file server
# This server MUST listen on 0.0.0.0 and use the PORT environment variable.
# For example, using 'bunx sirv-cli' (assuming it respects PORT and 0.0.0.0)
# or a custom server.js like below.

# Option 1: If your project has a simple server.js or similar for production serving:
# COPY server.js ./
# CMD ["bun", "run", "start-prod"] # Assuming "start-prod" script in package.json runs the server

# Option 2: Using 'serve' from npm (requires Node.js, so base image might change)
# FROM node:18-alpine
# WORKDIR /app
# COPY --from=builder /app/dist ./dist
# RUN npm install -g serve
# CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:${PORT:-8080}"]

# Option 3 (recommended for Bun environment): Create a simple `server.js` or `index.js`
# in your project that uses Bun's built-in HTTP server or a lightweight Bun-compatible package
# to serve static files.

# Example of a simple Bun static server (you'd need to create this file in your project)
# file: server.js
# import { serve } from "bun";
# serve({
#   fetch(req) {
#     const url = new URL(req.url);
#     const filePath = `./dist${url.pathname === '/' ? '/index.html' : url.pathname}`;
#     const file = Bun.file(filePath);
#     return new Response(file);
#   },
#   port: process.env.PORT || 8080,
#   hostname: "0.0.0.0",
# });

# If you create such a `server.js` file:
# COPY server.js ./server.js
# CMD ["bun", "run", "server.js"]
