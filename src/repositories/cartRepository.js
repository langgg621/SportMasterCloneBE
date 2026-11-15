const { callProcedure } = require('../utils/callProcedure');
const { CartItem } = require('../models');

const cartRepository = {
  /** usp_cartItems_GetByUserID */
  async getByUser(userId) {
    const rows = await callProcedure('usp_cartItems_GetByUserID', [userId]);
    return CartItem.fromRows(rows);
  },

  /** usp_cartItems_Count — trả tổng Quantity */
  async count(userId) {
    const rows = await callProcedure('usp_cartItems_Count', [userId]);
    return rows[0]?.ItemCount ?? 0;
  },

  /** usp_cartItems_Add — USP tự CALL GetByUserID cuối, trả về list mới */
  async add(userId, { productId, sizeId, colorId, quantity }) {
    const rows = await callProcedure('usp_cartItems_Add', [
      userId,
      productId,
      sizeId,
      colorId ?? null,
      quantity ?? 1,
    ]);
    return CartItem.fromRows(rows);
  },

  /** usp_cartItems_UpdateQuantity */
  async updateQuantity(userId, cartItemId, quantity) {
    const rows = await callProcedure('usp_cartItems_UpdateQuantity', [
      userId,
      cartItemId,
      quantity,
    ]);
    return CartItem.fromRows(rows);
  },

  /** usp_cartItems_Remove */
  async remove(userId, cartItemId) {
    const rows = await callProcedure('usp_cartItems_Remove', [userId, cartItemId]);
    return CartItem.fromRows(rows);
  },

  /** usp_cartItems_Clear */
  async clear(userId) {
    const rows = await callProcedure('usp_cartItems_Clear', [userId]);
    return rows[0]?.Success === 1;
  },
};

module.exports = cartRepository;