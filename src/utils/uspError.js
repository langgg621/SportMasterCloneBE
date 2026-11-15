/**
 * Bản đồ mã lỗi (MESSAGE_TEXT từ SIGNAL trong USP)
 * map sang HTTP status + thông báo tiếng Nga cho người dùng.
 */
const USP_ERRORS = {
  // ==================== Cart (Корзина) ====================
  INVALID_QUANTITY:    { status: 400, msg: 'Недопустимое количество' },
  SIZE_NOT_FOUND:      { status: 404, msg: 'Размер не найден' },
  COLOR_NOT_FOUND:     { status: 404, msg: 'Цвет не найден' },
  OUT_OF_STOCK:        { status: 409, msg: 'Недостаточно товара на складе' },
  CART_ITEM_NOT_FOUND: { status: 404, msg: 'Товар не найден в корзине' },
  CART_EMPTY:          { status: 400, msg: 'Корзина пуста' },
  CART_INVALID:        { status: 400, msg: 'Корзина содержит недействительные или удаленные товары' },

  // ==================== Order (Заказ) ====================
  DELIVERY_TYPE_REQUIRED: { status: 400, msg: 'Пожалуйста, выберите способ получения' },
  PAYMENT_REQUIRED:       { status: 400, msg: 'Пожалуйста, выберите способ оплаты' },
  PICKUP_NOT_FOUND:       { status: 404, msg: 'Пункт выдачи не найден или закрыт' },
  ADDRESS_REQUIRED:       { status: 400, msg: 'Пожалуйста, укажите адрес доставки' },
  ORDER_NOT_FOUND:        { status: 404, msg: 'Заказ не найден' },
  CANNOT_CANCEL:          { status: 409, msg: 'Невозможно отменить заказ в текущем статусе' },
  INVALID_STATUS:         { status: 400, msg: 'Недопустимый статус заказа' },
  ORDER_FINALIZED:        { status: 409, msg: 'Заказ уже выполнен или отменен' },
  INVALID_TRANSITION:     { status: 409, msg: 'Невозможно вернуть заказ в предыдущий статус' },

  // ==================== User (Пользователь) ====================
  EMAIL_REQUIRED:    { status: 400, msg: 'Email обязателен для заполнения' },
  FULLNAME_REQUIRED: { status: 400, msg: 'Имя обязательно для заполнения' },
  PASSWORD_REQUIRED: { status: 400, msg: 'Пароль обязателен для заполнения' },
  INVALID_SEX:       { status: 400, msg: 'Недопустимый пол (0: Женский, 1: Мужской)' },
  EMAIL_EXISTS:      { status: 409, msg: 'Этот email уже зарегистрирован' },
  PHONE_EXISTS:      { status: 409, msg: 'Этот номер телефона уже зарегистрирован' },
  USERNAME_EXISTS:   { status: 409, msg: 'Имя пользователя уже существует' },
  USER_NOT_FOUND:    { status: 404, msg: 'Пользователь не найден' },

  // ==================== Review (Отзывы) ====================
  INVALID_RATING:   { status: 400, msg: 'Оценка должна быть от 1 до 5' },
  REVIEW_NOT_FOUND: { status: 404, msg: 'Отзыв не найден' },

  // ==================== Product (Товар) ====================
  PRODUCT_NOT_FOUND: { status: 404, msg: 'Товар не найден' },

  // ==================== Chat (Чат) ====================
  INVALID_SENDER: { status: 400, msg: 'Недопустимый отправитель' },
  BODY_REQUIRED:  { status: 400, msg: 'Сообщение не может быть пустым' },
};

/**
 * Chuyển đổi lỗi từ MySQL/Node thành dạng chuẩn cho API.
 * @param {Error} err
 * @returns {{ status: number, message: string, code: string }}
 */
function mapUspError(err) {
  // 1. Lỗi do USP tự bắn ra qua SIGNAL SQLSTATE '45000'
  if (err.sqlState === '45000' && err.sqlMessage) {
    const knownError = USP_ERRORS[err.sqlMessage];
    if (knownError) {
      return {
        status: knownError.status,
        message: knownError.msg,
        code: err.sqlMessage,
      };
    }
    // Nếu có SIGNAL lạ chưa map, trả về 400 kèm message gốc
    return { status: 400, message: err.sqlMessage, code: err.sqlMessage };
  }

  // 2. Lỗi cú pháp SQL, mất kết nối, v.v. (Lỗi hệ thống, không phải do user)
  if (err.sqlMessage) {
    return { status: 500, message: 'Ошибка базы данных', code: err.code };
  }

  // 3. Lỗi logic thông thường (throw new Error) từ code Node.js
  if (err.statusCode) {
    return { status: err.statusCode, message: err.message, code: err.code || 'APP_ERROR' };
  }

  // 4. Fallback
  return { status: 500, message: err.message || 'Внутренняя ошибка сервера', code: 'INTERNAL_ERROR' };
}

module.exports = { mapUspError, USP_ERRORS };