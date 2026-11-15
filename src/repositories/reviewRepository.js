const { callProcedure, callProcedureAll } = require('../utils/callProcedure');
const { ProductReview } = require('../models');

const reviewRepository = {
  /** usp_reviews_GetByProduct — 2 result set: reviews + rating distribution */
  async getByProduct(productId, { page = 1, pageSize = 10 } = {}) {
    const resultSets = await callProcedureAll('usp_reviews_GetByProduct', [
      productId,
      page,
      pageSize,
    ]);
    return ProductReview.fromList(resultSets);
  },

  /** usp_reviews_Upsert */
  async upsert(productId, userId, { rating, comment }) {
    const rows = await callProcedure('usp_reviews_Upsert', [
      productId,
      userId,
      rating,
      comment ?? null,
    ]);
    if (!rows[0]) return null;
    const r = rows[0];
    return {
      id: r.ReviewID,
      productId: r.ProductID,
      userId: r.UserID,
      rating: r.Rating,
      comment: r.Comment,
      createDate: r.CreateDate,
    };
  },

  /** usp_reviews_Delete */
  async remove(reviewId, userId) {
    const rows = await callProcedure('usp_reviews_Delete', [reviewId, userId]);
    return rows[0]?.Success === 1;
  },
};

module.exports = reviewRepository;