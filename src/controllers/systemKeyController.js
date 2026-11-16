const { systemKeyRepository } = require('../repositories');

const systemKeyController = {
  getAllGroups: async (req, res, next) => {
    try {
      const data = await systemKeyRepository.getAllGroups();
      res.json({ success: true, data });
    } catch (err) { next(err); }
  },

  getByParentID: async (req, res, next) => {
    try {
      const parentId = Number(req.query.parentId);
      if (!parentId) return res.status(400).json({ success: false, message: 'Thiếu parentId' });
      
      const data = await systemKeyRepository.getByParentID(parentId);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  }
};

module.exports = systemKeyController;