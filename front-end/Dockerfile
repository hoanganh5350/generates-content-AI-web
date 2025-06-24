# 1. Build phase
FROM node:18-alpine AS builder

WORKDIR /app

# Copy và cài dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ code
COPY . .

# Build Vite với mode "docker" → sẽ load .env.docker
RUN npm run build -- --mode docker


# 2. Serve phase với nginx
FROM nginx:alpine

# Copy dist từ builder
COPY --from=builder /app/dist /usr/share/nginx/html

# (Tùy chọn) Copy cấu hình nginx nếu có custom
# COPY nginx.conf /etc/nginx/nginx.conf

# Mở cổng HTTP
EXPOSE 80
