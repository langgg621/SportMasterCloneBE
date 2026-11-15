const { callProcedure } = require('../utils/callProcedure');
const { Category, Brand, Color, Collection, CatalogSection } = require('../models');

const catalogRepository = {
  // ==================== Category ====================
  /** usp_categories_GetAll */
  async getAllCategories() {
    const rows = await callProcedure('usp_categories_GetAll');
    return Category.fromRows(rows);
  },

  /** usp_categories_GetByParentID — parentId = null để lấy gốc */
  async getCategoriesByParent(parentId = null) {
    const rows = await callProcedure('usp_categories_GetByParentID', [parentId]);
    return Category.fromRows(rows);
  },

  // ==================== Brand ====================
  /** usp_brand_GetAll */
  async getAllBrands() {
    const rows = await callProcedure('usp_brand_GetAll');
    return Brand.fromRows(rows);
  },

  // ==================== Color ====================
  /** usp_colors_GetAll */
  async getAllColors() {
    const rows = await callProcedure('usp_colors_GetAll');
    return Color.fromRows(rows);
  },

  // ==================== Collection ====================
  /** usp_collections_GetAll */
  async getAllCollections() {
    const rows = await callProcedure('usp_collections_GetAll');
    return Collection.fromRows(rows);
  },

  // ==================== CatalogSection ====================
  /** usp_catalog_GetSections — list phẳng */
  async getSections() {
    const rows = await callProcedure('usp_catalog_GetSections');
    return CatalogSection.fromRows(rows);
  },

  /** usp_catalog_GetSections — nhóm theo type */
  async getSectionsGrouped() {
    const rows = await callProcedure('usp_catalog_GetSections');
    return CatalogSection.groupByType(rows);
  },
};

module.exports = catalogRepository;