const { callProcedure } = require('../utils/callProcedure');
const { ChatMessage } = require('../models');

const chatRepository = {
  /** usp_chat_GetUnreadCount — số tin support chưa đọc */
  async getUnreadCount(userId) {
    const rows = await callProcedure('usp_chat_GetUnreadCount', [userId]);
    return rows[0]?.UnreadCount ?? 0;
  },

  /** usp_chat_GetMessages */
  async getMessages(userId, { limit = 50 } = {}) {
    const rows = await callProcedure('usp_chat_GetMessages', [userId, limit]);
    return ChatMessage.fromRows(rows);
  },

  /** usp_chat_SendMessage — sender: 'user' | 'support' */
  async sendMessage(userId, { sender, body }) {
    const rows = await callProcedure('usp_chat_SendMessage', [userId, sender, body]);
    return ChatMessage.fromRow(rows[0]);
  },
};

module.exports = chatRepository;