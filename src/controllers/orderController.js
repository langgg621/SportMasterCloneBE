const orderRepository = require('../repositories/orderRepository');

exports.create = async (req, res, next) => {
  try {
    const order = await orderRepository.create(req.user.id, req.body);
    res.status(201).json({ success: true, data: order });
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const status = req.query.status ? Number(req.query.status) : undefined;
    const page = req.query.page ? Number(req.query.page) : 1;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;

    const result = await orderRepository.getByUser(req.user.id, { status, page, pageSize });
    res.json({ success: true, ...result });
  } catch (err) { next(err); }
};

exports.getDetail = async (req, res, next) => {
  try {
    const order = await orderRepository.getDetail(req.params.id, req.user.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Заказ не найден' });
    }
    res.json({ success: true, data: order });
  } catch (err) { next(err); }
};

exports.getConfirmation = async (req, res, next) => {
  try {
    const order = await orderRepository.getConfirmation(req.params.id, req.user.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Заказ не найден' });
    }
    res.json({ success: true, data: order });
  } catch (err) { next(err); }
};

exports.cancel = async (req, res, next) => {
  try {
    await orderRepository.cancel(req.params.id, req.user.id);
    res.json({ success: true, message: 'Заказ успешно отменен' });
  } catch (err) { next(err); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await orderRepository.updateStatus(req.params.id, status);
    res.json({ success: true, data: order });
  } catch (err) { next(err); }
};