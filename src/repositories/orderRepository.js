const { callProcedure, callProcedureAll } = require('../utils/callProcedure');
const { Order, OrderItem } = require('../models');

const orderRepository = {
  /**
   * usp_orders_Create
   * ⚠️ USP này chạy transaction, gọi lại usp_orders_GetDetail bên trong
   * -> Trả về 2 result set: [headerRows, itemRows].
   */
  async create(userId, data) {
    const resultSets = await callProcedureAll('usp_orders_Create', [
      userId,
      data.deliveryType,
      data.pickupId ?? null,
      data.shippingAddress ?? null,
      data.shippingPhone ?? null,
      data.paymentType,
      data.shippingFee ?? 0,
      data.discountAmount ?? 0,
    ]);
    return Order.fromDetail(resultSets);
  },

  /** usp_orders_GetByUserID */
  async getByUser(userId, { status, page, pageSize } = {}) {
    const rows = await callProcedure('usp_orders_GetByUserID', [
      userId,
      status ?? null,
      page ?? 1,
      pageSize ?? 10,
    ]);
    return Order.fromList(rows);
  },

  /** usp_orders_GetDetail — 2 result set */
  async getDetail(orderId, userId = null) {
    const resultSets = await callProcedureAll('usp_orders_GetDetail', [orderId, userId]);
    return Order.fromDetail(resultSets);
  },

  /** usp_orders_GetConfirmation — 2 result set */
  async getConfirmation(orderId, userId = null) {
    const [headerRows, itemRows] = await callProcedureAll('usp_orders_GetConfirmation', [
      orderId,
      userId,
    ]);
    if (!headerRows?.length) return null;

    const h = headerRows[0];
    return {
      orderId: h.OrderID,
      orderNumber: h.OrderNumber,
      status: h.Status,
      statusText: h.StatusText,
      totalAmount: Number(h.TotalAmount),
      paymentType: h.PaymentType,
      deliveryType: h.DeliveryType,
      createDate: h.CreateDate,
      pickupName: h.PickupName,
      pickupAddress: h.PickupAddress,
      availableFrom: h.AvailableFrom,
      availableFromText: h.AvailableFromText,
      payBefore: h.PayBefore,
      items: OrderItem.fromRows(itemRows || []),
    };
  },

  /** usp_orders_UpdateStatus (nội bộ/admin) */
  async updateStatus(orderId, newStatus) {
    const rows = await callProcedure('usp_orders_UpdateStatus', [orderId, newStatus]);
    return rows[0] || null;
  },

  /** usp_orders_Cancel */
  async cancel(orderId, userId) {
    await callProcedure('usp_orders_Cancel', [orderId, userId]);
    return true;
  },
};

module.exports = orderRepository;