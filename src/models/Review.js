// ============================================
// ProductReview
// ============================================
class ProductReview {
  constructor({ id, productId, userId, fullName, rating, comment, createDate, totalCount }) {
    this.id = id;
    this.productId = productId;
    this.userId = userId;
    this.fullName = fullName;
    this.rating = rating;
    this.comment = comment;
    this.createDate = createDate;
    this.totalCount = totalCount;
  }

  static fromRow(r) {
    if (!r) return null;
    return new ProductReview({
      id: r.ReviewID,
      productId: r.ProductID,
      userId: r.UserID,
      fullName: r.FullName,
      rating: r.Rating,
      comment: r.Comment,
      createDate: r.CreateDate,
      totalCount: r.TotalCount,
    });
  }

  static fromRows(rows = []) {
    return rows.map(ProductReview.fromRow);
  }

  // Ghép 2 result set từ usp_reviews_GetByProduct
  static fromList([reviewRows, ratingStats]) {
    return {
      items: ProductReview.fromRows(reviewRows || []),
      ratingDistribution: (ratingStats || []).map(s => ({
        rating: s.Rating,
        total: s.Total,
      })),
      total: reviewRows?.[0]?.TotalCount ?? 0,
    };
  }

  toJSON() { return { ...this }; }
}

module.exports = { ProductReview };