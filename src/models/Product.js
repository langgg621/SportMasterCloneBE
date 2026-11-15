// ============================================
// Product — entity chính
// ============================================
class Product {
  constructor({
    id, productName, sku, price, discount, categoryId, brandId,
    gender, season, sportType, upperMaterial, fastener,
    waterProtection, insulation,
    isSale, isBestPrice, isNewCollection, isComingSoon,
    isExclusive, isPremium, isEco,
    imageUrl, description, createdDate,
    newPrice, brandName, categoryName, totalStock,
    sizes, colors, avgRating, reviewCount, bonusAmount,
    technologies, characteristics, collections,
  }) {
    this.id = id;
    this.productName = productName;
    this.sku = sku;
    this.price = price != null ? Number(price) : null;
    this.discount = discount;
    this.categoryId = categoryId;
    this.brandId = brandId;
    this.gender = gender;
    this.season = season;
    this.sportType = sportType;
    this.upperMaterial = upperMaterial;
    this.fastener = fastener;
    this.waterProtection = waterProtection;
    this.insulation = insulation;
    this.isSale = !!isSale;
    this.isBestPrice = !!isBestPrice;
    this.isNewCollection = !!isNewCollection;
    this.isComingSoon = !!isComingSoon;
    this.isExclusive = !!isExclusive;
    this.isPremium = !!isPremium;
    this.isEco = !!isEco;
    this.imageUrl = imageUrl;
    this.description = description;
    this.createdDate = createdDate;
    // computed (từ USP)
    this.newPrice = newPrice != null ? Number(newPrice) : null;
    this.brandName = brandName;
    this.categoryName = categoryName;
    this.totalStock = totalStock;
    this.sizes = sizes;
    this.colors = colors;
    this.avgRating = avgRating != null ? Number(avgRating) : null;
    this.reviewCount = reviewCount;
    this.bonusAmount = bonusAmount;
    this.technologies = technologies;
    this.characteristics = characteristics;
    this.collections = collections;
  }

  static _parseJson(val, fallback = []) {
    if (val == null) return fallback;
    if (typeof val === 'object') return val;
    try { return JSON.parse(val); } catch { return fallback; }
  }

  static fromRow(r) {
    if (!r) return null;
    return new Product({
      id: r.ProductID,
      productName: r.ProductName,
      sku: r.SKU,
      price: r.Price,
      discount: r.Discount,
      categoryId: r.CategoryID,
      brandId: r.BrandID,
      gender: r.Gender,
      season: r.Season,
      sportType: r.SportType,
      upperMaterial: r.UpperMaterial,
      fastener: r.Fastener,
      waterProtection: r.WaterProtection,
      insulation: r.Insulation,
      isSale: r.IsSale,
      isBestPrice: r.IsBestPrice,
      isNewCollection: r.IsNewCollection,
      isComingSoon: r.IsComingSoon,
      isExclusive: r.IsExclusive,
      isPremium: r.IsPremium,
      isEco: r.IsEco,
      imageUrl: r.ImageUrl,
      description: r.Description,
      createdDate: r.CreatedDate,
      newPrice: r.NewPrice,
      brandName: r.BrandName,
      categoryName: r.CategoryName,
      totalStock: r.TotalStock,
      sizes: Product._parseJson(r.SizesJson),
      colors: Product._parseJson(r.ColorsJson),
      avgRating: r.AvgRating,
      reviewCount: r.ReviewCount,
      bonusAmount: r.BonusAmount,
      technologies: Product._parseJson(r.TechnologiesJson),
      characteristics: Product._parseJson(r.CharacteristicsJson),
      collections: Product._parseJson(r.CollectionsJson),
    });
  }

  static fromRows(rows = []) {
    return rows.map(Product.fromRow);
  }

  // Dùng cho usp_products_GetAllProduct (có pagination meta)
  static fromList(rows = []) {
    if (!rows.length) {
      return { items: [], total: 0, page: 1, pageSize: 20, totalPages: 0 };
    }
    const first = rows[0];
    return {
      items: rows.map(Product.fromRow),
      total: first.TotalCount,
      page: first.CurrentPage,
      pageSize: first.PageSize,
      totalPages: first.TotalPages,
    };
  }

  toJSON() { return { ...this }; }
}

// ============================================
// ProductSize
// ============================================
class ProductSize {
  constructor({ id, size, stockQuantity, productId, footLengthCm }) {
    this.id = id;
    this.size = size;
    this.stockQuantity = stockQuantity;
    this.productId = productId;
    this.footLengthCm = footLengthCm != null ? Number(footLengthCm) : null;
  }

  static fromRow(r) {
    if (!r) return null;
    return new ProductSize({
      id: r.ID,
      size: r.Size,
      stockQuantity: r.StockQuantity,
      productId: r.ProductID,
      footLengthCm: r.FootLengthCm,
    });
  }

  static fromJson({ sizeID, size, stock, cm }) {
    return new ProductSize({ id: sizeID, size, stockQuantity: stock, footLengthCm: cm });
  }

  static fromRows(rows = []) {
    return rows.map(ProductSize.fromRow);
  }

  toJSON() { return { ...this }; }
}

// ============================================
// ProductColor — bảng nối Product <-> Color
// ============================================
class ProductColor {
  constructor({ productId, colorId }) {
    this.productId = productId;
    this.colorId = colorId;
  }

  static fromRow(r) {
    if (!r) return null;
    return new ProductColor({ productId: r.ProductID, colorId: r.ColorID });
  }

  toJSON() { return { ...this }; }
}

// ============================================
// ProductTechnology
// ============================================
class ProductTechnology {
  constructor({ id, productId, technology }) {
    this.id = id;
    this.productId = productId;
    this.technology = technology;
  }

  static fromRow(r) {
    if (!r) return null;
    return new ProductTechnology({ id: r.ID, productId: r.ProductID, technology: r.Technology });
  }

  static fromRows(rows = []) {
    return rows.map(ProductTechnology.fromRow);
  }

  toJSON() { return { ...this }; }
}

// ============================================
// ProductCharacteristic
// ============================================
class ProductCharacteristic {
  constructor({ id, charKey, charValue, productId, groupTitle, sortOrder }) {
    this.id = id;
    this.charKey = charKey;
    this.charValue = charValue;
    this.productId = productId;
    this.groupTitle = groupTitle;
    this.sortOrder = sortOrder;
  }

  static fromRow(r) {
    if (!r) return null;
    return new ProductCharacteristic({
      id: r.CharateristicID,
      charKey: r.CharKey,
      charValue: r.CharValue,
      productId: r.ProductID,
      groupTitle: r.GroupTitle,
      sortOrder: r.SortOrder,
    });
  }

  static fromJson({ key, value }) {
    return new ProductCharacteristic({ charKey: key, charValue: value });
  }

  static fromRows(rows = []) {
    return rows.map(ProductCharacteristic.fromRow);
  }

  toJSON() { return { ...this }; }
}

// ============================================
// ProductSection — nội dung biên tập theo section
// ============================================
class ProductSection {
  constructor({ id, productId, sectionKey, title, body, sortOrder }) {
    this.id = id;
    this.productId = productId;
    this.sectionKey = sectionKey;
    this.title = title;
    this.body = body;
    this.sortOrder = sortOrder;
  }

  static fromRow(r) {
    if (!r) return null;
    return new ProductSection({
      id: r.SectionID,
      productId: r.ProductID,
      sectionKey: r.SectionKey,
      title: r.Title,
      body: r.Body,
      sortOrder: r.SortOrder,
    });
  }

  static fromRows(rows = []) {
    return rows.map(ProductSection.fromRow);
  }

  toJSON() { return { ...this }; }
}

// ============================================
// ProductCollection — bảng nối Product <-> Collection
// ============================================
class ProductCollection {
  constructor({ productId, collectionId }) {
    this.productId = productId;
    this.collectionId = collectionId;
  }

  static fromRow(r) {
    if (!r) return null;
    return new ProductCollection({ productId: r.ProductID, collectionId: r.CollectionID });
  }

  toJSON() { return { ...this }; }
}

module.exports = {
  Product,
  ProductSize,
  ProductColor,
  ProductTechnology,
  ProductCharacteristic,
  ProductSection,
  ProductCollection,
};