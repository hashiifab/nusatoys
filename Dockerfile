# Stage 1: Build deps
FROM oven/bun:1.2.4 AS deps
WORKDIR /app
COPY package.json bun.lock turbo.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/
COPY shared/package.json ./shared/
RUN bun install --ignore-scripts

# Stage 2: Build source
FROM oven/bun:1.2.4 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build for single origin
RUN bun run build:single

# Stage 3: Production
FROM oven/bun:1.2.4-slim AS production
WORKDIR /app

# Copy only needed files
COPY package.json bun.lock turbo.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/
COPY shared/package.json ./shared/

# Copy built code
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/static ./server/static
COPY --from=builder /app/shared/dist ./shared/dist

# Install only prod deps
RUN bun install --production --ignore-scripts

EXPOSE 3000
CMD ["bun", "run", "start:single"]
