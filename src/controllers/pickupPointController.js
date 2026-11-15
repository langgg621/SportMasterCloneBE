const pickupPointRepository = require('../repositories/pickupPointRepository');

exports.getAll = async (req, res, next) => {
  try {
    const pointType = req.query.pointType || null;
    const points = await pickupPointRepository.getAll(pointType);
    res.json({ success: true, data: points });
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const point = await pickupPointRepository.getById(req.params.id);
    if (!point) {
      return res.status(404).json({ success: false, message: 'Пункт выдачи не найден' });
    }
    res.json({ success: true, data: point });
  } catch (err) { next(err); }
};