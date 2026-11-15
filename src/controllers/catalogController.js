const catalogRepository = require('../repositories/catalogRepository');

exports.getCategories = async (req, res, next) => {
  try {
    const parentId = req.query.parentId || null;
    const categories = parentId !== undefined 
      ? await catalogRepository.getCategoriesByParent(parentId)
      : await catalogRepository.getAllCategories();
    res.json({ success: true, data: categories });
  } catch (err) { next(err); }
};

exports.getBrands = async (req, res, next) => {
  try {
    const brands = await catalogRepository.getAllBrands();
    res.json({ success: true, data: brands });
  } catch (err) { next(err); }
};

exports.getColors = async (req, res, next) => {
  try {
    const colors = await catalogRepository.getAllColors();
    res.json({ success: true, data: colors });
  } catch (err) { next(err); }
};

exports.getCollections = async (req, res, next) => {
  try {
    const collections = await catalogRepository.getAllCollections();
    res.json({ success: true, data: collections });
  } catch (err) { next(err); }
};

exports.getSections = async (req, res, next) => {
  try {
    const grouped = req.query.grouped === 'true';
    const sections = grouped
      ? await catalogRepository.getSectionsGrouped()
      : await catalogRepository.getSections();
    res.json({ success: true, data: sections });
  } catch (err) { next(err); }
};