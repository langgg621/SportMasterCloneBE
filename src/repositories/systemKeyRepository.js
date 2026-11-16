const { callProcedure } = require('../utils/callProcedure');
const SystemKey = require('../models/SystemKey');

const systemKeyRepository = {
  // Lấy danh sách các nhóm cha (ParentID = 0)
  async getAllGroups() {
    const rows = await callProcedure('usp_systemKey_GetAllGroups');
    return SystemKey.fromRows(rows);
  },

  // Lấy các giá trị con (VD: các phương thức thanh toán)
  async getByParentID(parentId) {
    const rows = await callProcedure('usp_systemKey_GetByParentID', [parentId]);
    return SystemKey.fromRows(rows);
  }
};

module.exports = systemKeyRepository;