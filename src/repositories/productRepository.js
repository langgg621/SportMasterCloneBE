const { callProcedure } = require('../utils/callProcedure');
const { Product } = require('../models');

const productRepository = {
  /**
   * usp_products_GetAllProduct — 14 params.
   * Dùng `??` để biến undefined -> null (tránh lỗi bind param của mysql2).
   */
  async list(filters = {}) {
    const rows = await callProcedure('usp_products_GetAllProduct', [
      filters.categoryId ?? null,
      filters.brandIds ?? null,
      filters.gender ?? null,
      filters.sportType ?? null,
      filters.season ?? null,
      filters.size ?? null,
      filters.colorId ?? null,
      filters.minPrice ?? null,
      filters.maxPrice ?? null,
      filters.onlySale ? 1 : null,
      filters.keyword ?? null,
      filters.sortBy ?? 'newest',
      filters.page ?? 1,
      filters.pageSize ?? 20,
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