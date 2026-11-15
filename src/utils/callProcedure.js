const pool = require('../config/db');

/**
 * Gọi USP, trả về RESULT SET ĐẦU TIÊN.
 * Dùng cho hầu hết USP (GetAll, GetByID, Insert...).
 */
async function callProcedure(procName, params = []) {
  // Xây dựng chuỗi `?, ?, ?` dựa trên số lượng tham số
  const placeholders = params.map(() => '?').join(', ');
  const sql = `CALL ${procName}(${placeholders})`;
  
  try {
    const [rows] = await pool.query(sql, params);
    
    // mysql2 trả về mảng các result set. 
    // Ví dụ: [ [ {id:1}, {id:2} ], ResultSetHeader ]
    const first = rows[0];
    
    // Nếu result set đầu tiên là 1 mảng -> trả về mảng các dòng.
    // Nếu là ResultSetHeader (khi USP chỉ INSERT/UPDATE) -> trả về object header.
    return Array.isArray(first) ? first : first;
  } catch (err) {
    // Ném lỗi ra để middleware errorHandler xử lý (map USP_ERRORS)
    throw err;
  }
}

/**
 * Gọi USP, trả về TẤT CẢ các result set.
 * Dùng cho USP có nhiều SELECT (vd: GetDetail trả Header + Items).
 */
async function callProcedureAll(procName, params = []) {
  const placeholders = params.map(() => '?').join(', ');
  const sql = `CALL ${procName}(${placeholders})`;
  
  try {
    const [rows] = await pool.query(sql, params);
    
    // Lọc bỏ ResultSetHeader (phần tử cuối thường là header)
    // để chỉ giữ lại các mảng dữ liệu (result set thực sự)
    return rows.filter(Array.isArray);
  } catch (err) {
    throw err;
  }
}

module.exports = { callProcedure, callProcedureAll };