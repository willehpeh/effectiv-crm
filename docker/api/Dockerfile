# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

COPY . .
RUN npm ci --legacy-peer-deps
RUN npx nx build api

# Stage 2: Run
FROM node:22-alpine
WORKDIR /app

COPY --from=builder /app/dist/apps/api ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
RUN npm ci --legacy-peer-deps --omit=dev

CMD ["node", "dist/main.js"]
