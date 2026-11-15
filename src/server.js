require('dotenv').config();
const app = require('./app');
const pool = require('./config/db');

// Lấy port từ biến môi trường, mặc định là 3000
const PORT = process.env.PORT || 3000;

let server;

/**
 * Khởi động Server
 */
async function startServer() {
  try {
    // 1. Kiểm tra kết nối Database trước khi bật Server
    console.log('⏳ Đang kết nối tới MySQL...');
    const connection = await pool.getConnection();
    await connection.ping(); // Ping thử xem DB có phản hồi không
    connection.release();    // Trả connection lại cho pool
    
    console.log('Kết nối MySQL thành công!');

    // 2. Bật Server Express
    server = app.listen(PORT, () => {
      console.log(`Server đang chạy tại: http://localhost:${PORT}`);
      console.log(`Môi trường: ${process.env.NODE_ENV || 'development'}`);
    });

  } catch (error) {
    console.error(' LỖI KHỞI ĐỘNG SERVER:');
    console.error(`Không thể kết nối tới Database hoặc Port ${PORT} đã bị chiếm.`);
    console.error(`Chi tiết: ${error.message}`);
    process.exit(1); // Thoát app nếu không kết nối được DB
  }
}

// Gọi hàm khởi động
startServer();

/**
 * Xử lý tắt Server an toàn (Graceful Shutdown)
 * Giúp đóng các kết nối DB đang treo và tắt server đúng cách khi bấm Ctrl+C
 */
function shutdown(signal) {
  console.log(`\n Nhận tín hiệu ${signal}. Đang tắt server...`);
  
  if (server) {
    server.close(async () => {
      console.log(' Đã đóng cổng HTTP.');
      try {
        await pool.end(); // Đóng tất cả kết nối tới MySQL
        console.log(' Đã đóng kết nối Database.');
        process.exit(0);
      } catch (err) {
        console.error(' Lỗi khi đóng Database:', err);
        process.exit(1);
      }
    });
  } else {
    process.exit(0);
  }

  // Nếu quá 10s không tắt được thì ép buộc tắt
  setTimeout(() => {
    console.error(' Quá thời gian chờ, buộc phải tắt server!');
    process.exit(1);
  }, 10000);
}

// Bắt tín hiệu tắt từ bàn phím (Ctrl+C) hoặc từ hệ điều hành
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));