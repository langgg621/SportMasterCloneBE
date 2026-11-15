const profileRepository = require('../repositories/profileRepository');

exports.getMenu = async (req, res, next) => {
  try {
    const menu = await profileRepository.getMenu(req.user.id);
    res.json({ success: true, data: menu });
  } catch (err) { next(err); }
};