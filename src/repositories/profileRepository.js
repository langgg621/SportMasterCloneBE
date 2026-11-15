const { callProcedure } = require('../utils/callProcedure');
const { ProfileMenuItem } = require('../models');

const profileRepository = {
  /** usp_profile_GetMenu */
  async getMenu(userId) {
    const rows = await callProcedure('usp_profile_GetMenu', [userId]);
    return ProfileMenuItem.fromRows(rows);
  },
};

module.exports = profileRepository;