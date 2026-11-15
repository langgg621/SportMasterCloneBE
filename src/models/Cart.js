// ============================================
// CartItem
// ============================================
class CartItem {
  constructor({
    id, userId, productId, sizeId, colorId, quantity,
    productName, imageUrl, price, discount, newPrice, lineTotal,
    sizeName, sizeStock, isOverStock, colorName,
    createDate, updateDate,
  }) {
    this.id = id;
    this.userId = userId;
    this.productId = productId;
    this.sizeId = sizeId;
    this.colorId = colorId;
    this.quantity = quantity;
    this.productName = productName;
    this.imageUrl = imageUrl;
    this.price = price != null ? Number(price) : null;
    this.discount = discount;
    this.newPrice = newPrice != null ? Number(newPrice) : null;
    this.lineTotal = lineTotal != null ? Number(lineTotal) : null;
    this.sizeName = sizeName;
    this.sizeStock = sizeStock;
    this.isOverStock = !!isOverStock;
    this.colorName = colorName;
    this.createDate = createDate;
    this.updateDate = updateDate;
  }

  static fromRow(r) {
    if (!r) return null;
    return new CartItem({
      id: r.ID,
      userId: r.UserID,
      productId: r.ProductID,
      sizeId: r.SizeID,
      colorId: r.ColorID,
      quantity: r.Quantity,
      productName: r.ProductName,
      imageUrl: r.ImageUrl,
      price: r.Price,
      discount: r.Discount,
      newPrice: r.NewPrice,
      lineTotal: r.LineTotal,
      sizeName: r.SizeName,
      sizeStock: r.SizeStock,
      isOverStock: r.IsOverStock,
      colorName: r.ColorName,
      createDate: r.CreateDate,
      updateDate: r.UpdatedDate,
    });
  }

  static fromRows(rows = []) {
    return rows.map(CartItem.fromRow);
  }

  toJSON() { return { ...this }; }
}

module.exports = { CartItem };