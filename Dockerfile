# Sử dụng Node.js bản LTS
FROM node:20-alpine

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm ci --only=production

# Copy toàn bộ source code (bao gồm cả thư mục src và docs) vào container
COPY . .

# Mở cổng 3000
EXPOSE 3000

# Chạy server (Lưu ý: trỏ vào src/server.js vì file server của bạn nằm trong src)
CMD ["node", "src/server.js"]