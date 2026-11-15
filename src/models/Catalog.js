// ============================================
// Category
// ============================================
class Category {
  constructor({ id, name, icon, parentId, isActive }) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.parentId = parentId;
    this.isActive = isActive;
  }

  static fromRow(r) {
    if (!r) return null;
    // IsActive là BIT(1) → mysql2 trả Buffer
    let isActive = r.IsActive;
    if (Buffer.isBuffer(isActive)) isActive = isActive[0] === 1;
    else if (isActive != null) isActive = !!isActive;

    return new Category({
      id: r.CategoryID,
      name: r.Name,
      icon: r.Icon,
      parentId: r.ParentID,
      isActive,
    });
  }

  static fromRows(rows = []) {
    return rows.map(Category.fromRow);
  }

  toJSON() { return { ...this }; }
}

// ============================================
// Brand
// ============================================
class Brand {
  constructor({ id, name, logoUrl }) {
    this.id = id;
    this.name = name;
    this.logoUrl = logoUrl;
  }

  static fromRow(r) {
    if (!r) return null;
    return new Brand({ id: r.BrandID, name: r.Name, logoUrl: r.logo_url });
  }

  static fromRows(rows = []) {
    return rows.map(Brand.fromRow);
  }

  toJSON() { return { ...this }; }
}

// ============================================
// Color
// ============================================
class Color {
  constructor({ id, colorName, colorType }) {
    this.id = id;
    this.colorName = colorName;
    this.colorType = colorType;
  }

  static fromRow(r) {
    if (!r) return null;
    return new Color({ id: r.ColorID, colorName: r.ColorName, colorType: r.ColorType });
  }

  static fromRows(rows = []) {
    return rows.map(Color.fromRow);
  }

  toJSON() { return { ...this }; }
}

// ============================================
// Collection
// ============================================
class Collection {
  constructor({ id, collectionName }) {
    this.id = id;
    this.collectionName = collectionName;
  }

  static fromRow(r) {
    if (!r) return null;
    return new Collection({ id: r.CollectionID, collectionName: r.CollectionName });
  }

  static fromRows(rows = []) {
    return rows.map(Collection.fromRow);
  }

  toJSON() { return { ...this }; }
}

// ============================================
// CatalogSection
// ============================================
class CatalogSection {
  constructor({ id, sectionType, title, imageUrl, linkUrl, sortOrder, isActive }) {
    this.id = id;
    this.sectionType = sectionType;   // service | gender | category | sport
    this.title = title;
    this.imageUrl = imageUrl;
    this.linkUrl = linkUrl;
    this.sortOrder = sortOrder;
    this.isActive = !!isActive;
  }

  static fromRow(r) {
    if (!r) return null;
    return new CatalogSection({
      id: r.ItemID,
      sectionType: r.SectionType,
      title: r.Title,
      imageUrl: r.ImageUrl,
      linkUrl: r.LinkUrl,
      sortOrder: r.SortOrder,
      isActive: r.IsActive,
    });
  }

  static fromRows(rows = []) {
    return rows.map(CatalogSection.fromRow);
  }

  // Gom nhóm theo SectionType
  static groupByType(rows = []) {
    const result = { service: [], gender: [], category: [], sport: [] };
    for (const row of rows) {
      const item = CatalogSection.fromRow(row);
      if (result[item.sectionType]) result[item.sectionType].push(item);
    }
    return result;
  }

  toJSON() { return { ...this }; }
}

// ============================================
// Banner
// ============================================
class Banner {
  constructor({ id, title, imageUrl, linkUrl, isActive, displayOrder, type }) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.linkUrl = linkUrl;
    this.isActive = !!isActive;
    this.displayOrder = displayOrder;
    this.type = type;                  // 1=main, 2=discount, 3=single
  }

  static fromRow(r) {
    if (!r) return null;
    return new Banner({
      id: r.BannerID,
      title: r.Title,
      imageUrl: r.ImageUrl,
      linkUrl: r.LinkUrl,
      isActive: r.IsActive,
      displayOrder: r.DisplayOrder,
      type: r.Type,
    });
  }

  static fromRows(rows = []) {
    return rows.map(Banner.fromRow);
  }

  toJSON() { return { ...this }; }
}

// ============================================
// DailyDeal
// ============================================
class DailyDeal {
  constructor({ id, productId, startAt, endAt, sortOrder, isActive }) {
    this.id = id;
    this.productId = productId;
    this.startAt = startAt;
    this.endAt = endAt;
    this.sortOrder = sortOrder;
    this.isActive = !!isActive;
  }

  static fromRow(r) {
    if (!r) return null;
    return new DailyDeal({
      id: r.DealID,
      productId: r.ProductID,
      startAt: r.StartAt,
      endAt: r.EndAt,
      sortOrder: r.SortOrder,
      isActive: r.IsActive,
    });
  }

  static fromRows(rows = []) {
    return rows.map(DailyDeal.fromRow);
  }

  toJSON() { return { ...this }; }
}

module.exports = { Category, Brand, Color, Collection, CatalogSection, Banner, DailyDeal };