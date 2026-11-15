const cartRepository = require('../repositories/cartRepository');

exports.getCart = async (req, res, next) => {
  try {
    const items = await cartRepository.getByUser(req.user.id);
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
};

exports.getCount = async (req, res, next) => {
  try {
    const count = await cartRepository.count(req.user.id);
    res.json({ success: true, data: count });
  } catch (err) { next(err); }
};

exports.add = async (req, res, next) => {
  try {
    const { productId, sizeId, colorId, quantity } = req.body;
    if (!productId || !sizeId) {
      return res.status(400).json({ success: false, message: 'Отсутствует productId или sizeId' });
    }

    const items = await cartRepository.add(req.user.id, { productId, sizeId, colorId, quantity });
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
};

exports.updateQuantity = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const items = await cartRepository.updateQuantity(req.user.id, req.params.id, quantity);
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const items = await cartRepository.remove(req.user.id, req.params.id);
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
};

exports.clear = async (req, res, next) => {
  try {
    await cartRepository.clear(req.user.id);
    res.json({ success: true, message: 'Корзина очищена' });
  } catch (err) { next(err); }
};