// ============================================
// ChatMessage
// ============================================
class ChatMessage {
  constructor({ id, userId, sender, body, isRead, createDate }) {
    this.id = id;
    this.userId = userId;
    this.sender = sender;              // support | user
    this.body = body;
    this.isRead = !!isRead;
    this.createDate = createDate;
  }

  static fromRow(r) {
    if (!r) return null;
    return new ChatMessage({
      id: r.MessageID,
      userId: r.UserID,
      sender: r.Sender,
      body: r.Body,
      isRead: r.IsRead,
      createDate: r.CreateDate,
    });
  }

  static fromRows(rows = []) {
    return rows.map(ChatMessage.fromRow);
  }

  toJSON() { return { ...this }; }
}

module.exports = { ChatMessage };