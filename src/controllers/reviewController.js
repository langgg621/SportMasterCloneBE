const reviewRepository = require('../repositories/reviewRepository');

exports.list = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;
    const result = await reviewRepository.getByProduct(req.params.productId, { page, pageSize });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

exports.upsert = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const review = await reviewRepository.upsert(req.params.productId, req.user.id, { rating, comment });
    res.json({ success: true, data: review });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await reviewRepository.remove(req.params.id, req.user.id);
    res.json({ success: true, message: 'Отзыв успешно удален' });
  } catch (err) { next(err); }
};