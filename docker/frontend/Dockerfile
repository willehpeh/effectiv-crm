# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

COPY . .
RUN npm ci --legacy-peer-deps
RUN npx nx build frontend --configuration=production

# Stage 2: Serve with NGINX
FROM nginx:alpine
COPY --from=builder /app/dist/apps/frontend /usr/share/nginx/html
COPY docker/frontend/nginx.conf /etc/nginx/conf.d/default.conf
