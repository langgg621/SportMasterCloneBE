const { callProcedure } = require('../utils/callProcedure');
const { Banner, Product } = require('../models');

const bannerRepository = {
  /** usp_banners_GetByType — 1=main, 2=discount, 3=single, null=all active */
  async getByType(type = null) {
    const rows = await callProcedure('usp_banners_GetByType', [type]);
    return Banner.fromRows(rows);
  },

  /** usp_banners_GetSingle — banner type=3 đầu tiên */
  async getSingle() {
    const rows = await callProcedure('usp_banners_GetSingle');
    return Banner.fromRow(rows[0]);
  },

  /** usp_dailyDeals_GetActive — trả list product đang trong deal */
  async getDailyDeals(limit = 20) {
    const rows = await callProcedure('usp_dailyDeals_GetActive', [limit]);
    return Product.fromRows(rows);
  },
};

module.exports = bannerRepository;