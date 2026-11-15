const bannerRepository = require('../repositories/bannerRepository');

exports.getByType = async (req, res, next) => {
  try {
    const type = req.query.type ? Number(req.query.type) : null;
    const banners = await bannerRepository.getByType(type);
    res.json({ success: true, data: banners });
  } catch (err) { next(err); }
};

exports.getSingle = async (req, res, next) => {
  try {
    const banner = await bannerRepository.getSingle();
    res.json({ success: true, data: banner });
  } catch (err) { next(err); }
};

exports.getDailyDeals = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 20;
    const deals = await bannerRepository.getDailyDeals(limit);
    res.json({ success: true, data: deals });
  } catch (err) { next(err); }
};