# 1. Dùng image Node.js nhẹ
FROM node:18-alpine

# 2. Làm việc tại /app hoặc tên khác bạn muốn
WORKDIR /app

# 3. Copy package.json và lock file
COPY package*.json ./

# 4. Cài đặt dependencies
RUN npm install

# 5. Copy toàn bộ mã nguồn
COPY . .

# 6. Build TypeScript
RUN npm run build 

# 7. Mở cổng (giả sử bạn dùng 5000)
EXPOSE 5000

# 8. Chạy ứng dụng
CMD ["npm", "start"]