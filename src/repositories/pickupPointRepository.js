const { callProcedure } = require('../utils/callProcedure');
const { PickupPoint } = require('../models');

const pickupPointRepository = {
  /** usp_pickupPoints_GetByID */
  async getById(pickupId) {
    const rows = await callProcedure('usp_pickupPoints_GetByID', [pickupId]);
    return PickupPoint.fromRow(rows[0]);
  },

  /** usp_pickupPoints_GetAll — pointType = null | 'store' | 'partner' | 'locker' */
  async getAll(pointType = null) {
    const rows = await callProcedure('usp_pickupPoints_GetAll', [pointType]);
    return PickupPoint.fromRows(rows);
  },
};

module.exports = pickupPointRepository;