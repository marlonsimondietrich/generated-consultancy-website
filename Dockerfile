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
# Expose the port the application will run on
EXPOSE 80
# Command to run the application using Vite's preview server
# This serves the static files from the 'dist' directory
CMD ["bunx", "vite", "preview", "--host", "0.0.0.0", "--port", "80"]
