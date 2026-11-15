const { callProcedure } = require('../utils/callProcedure');
const { User } = require('../models');

const userRepository = {
  /** usp_users_GetByID */
  async getById(userId) {
    const rows = await callProcedure('usp_users_GetByID', [userId]);
    return User.fromRow(rows[0]);
  },

  /** usp_users_Register */
  async register({ fullName, userName, password, email, phone, address, sex }) {
    const rows = await callProcedure('usp_users_Register', [
      fullName,
      userName || null,
      password,
      email,
      phone || null,
      address || null,
      sex ?? null,
    ]);
    return User.fromRow(rows[0]);
  },

  /** usp_users_UpdateProfile */
  async updateProfile(userId, { fullName, userName, phone, address, sex }) {
    const rows = await callProcedure('usp_users_UpdateProfile', [
      userId,
      fullName || null,
      userName || null,
      phone || null,
      address || null,
      sex ?? null,
    ]);
    return User.fromRow(rows[0]);
  },

  /** usp_users_ChangePassword */
  async changePassword(userId, newPassword) {
    await callProcedure('usp_users_ChangePassword', [userId, newPassword]);
    return true;
  },

  /**
   * usp_users_Login
   * Trả về raw row (BAO GỒM Password hash) để controller so sánh bcrypt.
   */
  async findForLogin(email) {
    const rows = await callProcedure('usp_users_Login', [email]);
    return rows[0] || null;
  },
};

module.exports = userRepository;