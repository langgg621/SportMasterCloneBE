// ============================================
// Order
// ============================================
class Order {
  constructor({
    id, orderNumber, userId, pickupId, shippingAddress, shippingPhone,
    deliveryType, shippingFee, subtotal, paymentType, totalAmount,
    discountAmount, status, createDate,
    itemCount, firstImageUrl, totalCount,
    pickupName, pickupAddress, pickupWorkingHours,
    items,
  }) {
    this.id = id;
    this.orderNumber = orderNumber;
    this.userId = userId;
    this.pickupId = pickupId;
    this.shippingAddress = shippingAddress;
    this.shippingPhone = shippingPhone;
    this.deliveryType = deliveryType;
    this.shippingFee = shippingFee != null ? Number(shippingFee) : null;
    this.subtotal = subtotal != null ? Number(subtotal) : null;
    this.paymentType = paymentType;
    this.totalAmount = totalAmount != null ? Number(totalAmount) : null;
    this.discountAmount = discountAmount != null ? Number(discountAmount) : null;
    this.status = status;
    this.createDate = createDate;
    this.itemCount = itemCount;
    this.firstImageUrl = firstImageUrl;
    this.totalCount = totalCount;
    this.pickupName = pickupName;
    this.pickupAddress = pickupAddress;
    this.pickupWorkingHours = pickupWorkingHours;
    this.items = items;
  }

  static get STATUS_TEXT() {
    return { 1: 'Создан', 2: 'В пути', 3: 'Выполнен', 4: 'Отменён' };
  }

  static fromRow(r) {
    if (!r) return null;
    return new Order({
      id: r.ID,
      orderNumber: r.OrderNumber,
      userId: r.UserID,
      pickupId: r.PickupID,
      shippingAddress: r.ShippingAddress,
      shippingPhone: r.ShippingPhone,
      deliveryType: r.DeliveryType,
      shippingFee: r.ShippingFee,
      subtotal: r.Subtotal,
      paymentType: r.PaymentType,
      totalAmount: r.TotalAmount,
      discountAmount: r.DiscountAmount,
      status: r.Status,
      // DB dùng CreateDate — usp_orders_GetByUserID đang lỗi gọi CreatedDate
      createDate: r.CreateDate ?? r.CreatedDate,
      itemCount: r.ItemCount,
      firstImageUrl: r.FirstImageUrl,
      totalCount: r.TotalCount,
      pickupName: r.PickupName,
      pickupAddress: r.PickupAddress,
      pickupWorkingHours: r.PickupWorkingHours,
    });
  }

  static fromRows(rows = []) {
    return rows.map(Order.fromRow);
  }

  static fromList(rows = []) {
    if (!rows.length) return { items: [], total: 0 };
    return {
      items: rows.map(Order.fromRow),
      total: rows[0].TotalCount,
    };
  }

  // Ghép 2 result set từ usp_orders_GetDetail
  static fromDetail([orderRows, itemRows]) {
    if (!orderRows?.length) return null;
    const order = Order.fromRow(orderRows[0]);
    order.items = OrderItem.fromRows(itemRows || []);
    return order;
  }

  toJSON() { return { ...this }; }
}

// ============================================
// OrderItem
// ============================================
class OrderItem {
  constructor({ id, orderId, productId, colorId, sizeId, unitPrice, quantity, lineTotal, productName, imageUrl, sizeName, colorName }) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.colorId = colorId;
    this.sizeId = sizeId;
    this.unitPrice = unitPrice != null ? Number(unitPrice) : null;
    this.quantity = quantity;
    this.lineTotal = lineTotal != null ? Number(lineTotal) : null;
    this.productName = productName;
    this.imageUrl = imageUrl;
    this.sizeName = sizeName;
    this.colorName = colorName;
  }

  static fromRow(r) {
    if (!r) return null;
    return new OrderItem({
      id: r.ID,
      orderId: r.OrderID,
      productId: r.ProductID,
      colorId: r.ColorID,
      sizeId: r.SizeID,
      unitPrice: r.UnitPrice,
      quantity: r.Quantity,
      lineTotal: r.LineTotal,
      productName: r.ProductName,
      imageUrl: r.ImageUrl,
      sizeName: r.SizeName,
      colorName: r.ColorName,
    });
  }

  static fromRows(rows = []) {
    return rows.map(OrderItem.fromRow);
  }

  toJSON() { return { ...this }; }
}

// ============================================
// DeliveryOption
// ============================================
class DeliveryOption {
  constructor({ id, groupKey, optionCode, title, feeAmount, etaDaysMin, etaDaysMax, etaMinutes, prepayPercent, note, sortOrder, isActive }) {
    this.id = id;
    this.groupKey = groupKey;
    this.optionCode = optionCode;
    this.title = title;
    this.feeAmount = feeAmount != null ? Number(feeAmount) : 0;
    this.etaDaysMin = etaDaysMin;
    this.etaDaysMax = etaDaysMax;
    this.etaMinutes = etaMinutes;
    this.prepayPercent = prepayPercent;
    this.note = note;
    this.sortOrder = sortOrder;
    this.isActive = !!isActive;
  }

  static fromRow(r) {
    if (!r) return null;
    return new DeliveryOption({
      id: r.OptionID,
      groupKey: r.GroupKey,
      optionCode: r.OptionCode,
      title: r.Title,
      feeAmount: r.FeeAmount,
      etaDaysMin: r.EtaDaysMin,
      etaDaysMax: r.EtaDaysMax,
      etaMinutes: r.EtaMinutes,
      prepayPercent: r.PrepayPercent,
      note: r.Note,
      sortOrder: r.SortOrder,
      isActive: r.IsActive,
    });
  }

  static fromRows(rows = []) {
    return rows.map(DeliveryOption.fromRow);
  }

  toJSON() { return { ...this }; }
}

// ============================================
// PickupPoint
// ============================================
class PickupPoint {
  constructor({
    id, name, address, latitude, longitude, workingHours, storageDays, isActive,
    pointType, pickupFee, etaDaysMin, etaDaysMax, isInstant, prepayPercent,
  }) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.latitude = latitude != null ? Number(latitude) : null;
    this.longitude = longitude != null ? Number(longitude) : null;
    this.workingHours = workingHours;
    this.storageDays = storageDays;
    this.isActive = !!isActive;
    this.pointType = pointType;
    this.pickupFee = pickupFee != null ? Number(pickupFee) : null;
    this.etaDaysMin = etaDaysMin;
    this.etaDaysMax = etaDaysMax;
    this.isInstant = !!isInstant;
    this.prepayPercent = prepayPercent;
  }

  static fromRow(r) {
    if (!r) return null;
    return new PickupPoint({
      id: r.PickupID,
      name: r.Name,
      address: r.Address,
      latitude: r.Latitude,
      longitude: r.Longitude,
      workingHours: r.WorkingHours,
      storageDays: r.StorageDays,
      isActive: r.IsActive,
      pointType: r.PointType,
      pickupFee: r.PickupFee,
      etaDaysMin: r.EtaDaysMin,
      etaDaysMax: r.EtaDaysMax,
      isInstant: r.IsInstant,
      prepayPercent: r.PrepayPercent,
    });
  }

  static fromRows(rows = []) {
    return rows.map(PickupPoint.fromRow);
  }

  toJSON() { return { ...this }; }
}

module.exports = { Order, OrderItem, DeliveryOption, PickupPoint };