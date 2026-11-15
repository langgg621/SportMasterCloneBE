const productRepository = require('../repositories/productRepository');

exports.list = async (req, res, next) => {
  try {
    const result = await productRepository.list(req.query);
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

exports.getByFlag = async (req, res, next) => {
  try {
    const { flag } = req.params;
    const limit = Number(req.query.limit) || 10;
    const products = await productRepository.getByFlag(flag, limit);
    res.json({ success: true, data: products });
  } catch (err) { next(err); }
};

exports.getDetail = async (req, res, next) => {
  try {
    const product = await productRepository.getDetail(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Товар не найден' });
    }
    res.json({ success: true, data: product });
  } catch (err) { next(err); }
};

exports.getRelated = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const products = await productRepository.getRelated(req.params.id, limit);
    res.json({ success: true, data: products });
  } catch (err) { next(err); }
};

exports.getFrequentlyBought = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 10;
    const products = await productRepository.getFrequentlyBought(req.params.id, limit);
    res.json({ success: true, data: products });
  } catch (err) { next(err); }
};

exports.getSections = async (req, res, next) => {
  try {
    const sections = await productRepository.getSections(req.params.id);
    res.json({ success: true, data: sections });
  } catch (err) { next(err); }
};

exports.getSpecs = async (req, res, next) => {
  try {
    const specs = await productRepository.getSpecs(req.params.id);
    res.json({ success: true, data: specs });
  } catch (err) { next(err); }
};

exports.recordView = async (req, res, next) => {
  try {
    // Yêu cầu đăng nhập (req.user.id từ auth middleware)
    await productRepository.recordView(req.user.id, req.params.id);
    res.json({ success: true });
  } catch (err) { next(err); }
};