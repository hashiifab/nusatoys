# Stage 1: Build client
FROM oven/bun:1.2.4 AS builder
WORKDIR /app

# Copy package files
COPY package.json bun.lock turbo.json ./
COPY client/package.json ./client/
COPY client/tsconfig*.json ./client/
COPY tsconfig.json ./

# Install dependencies
RUN bun install --ignore-scripts

# Copy source code
COPY client ./client

# Build client
WORKDIR /app/client
RUN bun run build

# Stage 2: Production - serve static files
FROM nginx:alpine AS production

# Copy built client files to nginx
COPY --from=builder /app/client/dist /usr/share/nginx/html

# Copy nginx configuration
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
