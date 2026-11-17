const { callProcedure } = require('../utils/callProcedure');
const { Product } = require('../models');

const productRepository = {
  /**
   * usp_products_GetAllProduct — 31 params (thứ tự phải khớp với procedure).
   * Dùng `??` để biến undefined -> null (tránh lỗi bind param của mysql2).
   * Các filter nhiều giá trị nhận chuỗi "a,b,c" (FIND_IN_SET ở phía SQL).
   */
  async list(filters) {
    // Checkbox: chỉ lọc khi là 1 / '1' / true; '0', '', undefined -> null
    const flag = (v) => (v === true || v === 1 || v === '1' || v === 'true' ? 1 : null);

    const rows = await callProcedure('usp_products_GetAllProduct', [
      filters.categoryId ?? null,
      filters.brandIds ?? null,
      filters.gender ?? null,
      filters.sportType ?? null,
      filters.season ?? null,
      filters.sizes ?? null,
      filters.colorIds ?? null,
      filters.minPrice ?? null,
      filters.maxPrice ?? null,
      flag(filters.onlySale),
      filters.keyword ?? null,
      filters.sortBy ?? 'newest',
      filters.page ?? 1,
      filters.pageSize ?? 20,
      // Tham số lọc thuộc tính
      filters.fastener ?? null,
      filters.material ?? null,
      filters.pronation ?? null,
      filters.training ?? null,
      flag(filters.isBarefoot),
      // Tham số mới (12)
      filters.soleColor ?? null,
      filters.shoeWidth ?? null,
      filters.waterProtection ?? null,
      filters.insulation ?? null,
      filters.technologies ?? null,
      filters.collectionIds ?? null,
      flag(filters.isBestPrice),
      flag(filters.isNew),
      flag(filters.isComingSoon),
      flag(filters.isExclusive),
      flag(filters.isPremium),
      flag(filters.isEco),
    ]);
    return Product.fromList(rows);
  },
  /** usp_products_GetByFlag */
  async getByFlag(flag, limit = 10) {
    const rows = await callProcedure('usp_products_GetByFlag', [flag, limit]);
    return Product.fromRows(rows);
  },

  /** usp_products_GetDetailByID */
  async getDetail(productId) {
    const rows = await callProcedure('usp_products_GetDetailByID', [productId]);
    return Product.fromRow(rows[0]);
  },

  /** usp_products_GetRelated */
  async getRelated(productId, limit = 10) {
    const rows = await callProcedure('usp_products_GetRelated', [productId, limit]);
    return Product.fromRows(rows);
  },

  /** usp_products_GetFrequentlyBought */
  async getFrequentlyBought(productId, limit = 10) {
    const rows = await callProcedure('usp_products_GetFrequentlyBought', [productId, limit]);
    return Product.fromRows(rows);
  },

  /** usp_products_GetSections */
  async getSections(productId) {
    const rows = await callProcedure('usp_products_GetSections', [productId]);
    return rows.map(r => ({
      sectionKey: r.SectionKey,
      title: r.Title,
      body: r.Body,
    }));
  },

  /** usp_products_GetSpecs */
  async getSpecs(productId) {
    const rows = await callProcedure('usp_products_GetSpecs', [productId]);
    return rows.map(r => ({
      groupTitle: r.GroupTitle,
      label: r.Label,
      value: r.SpecValue,
      sortOrder: r.SortOrder,
    }));
  },

  /** usp_productViews_Record */
  async recordView(userId, productId) {
    await callProcedure('usp_productViews_Record', [userId, productId]);
    return true;
  },
};

module.exports = productRepository;