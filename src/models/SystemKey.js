class SystemKey {
  constructor({ id, parentId, codeKey, codeValue, description, sortOrder }) {
    this.id = id;
    this.parentId = parentId;
    this.codeKey = codeKey;
    this.codeValue = codeValue;
    this.description = description;
    this.sortOrder = sortOrder;
  }

  static fromRow(r) {
    if (!r) return null;
    return new SystemKey({
      id: r.ID,
      parentId: r.ParentID,
      codeKey: r.CodeKey,
      codeValue: r.CodeValue,
      description: r.Description,
      sortOrder: r.SortOrder,
    });
  }

  static fromRows(rows = []) {
    return rows.map(SystemKey.fromRow);
  }

  toJSON() { return { ...this }; }
}

module.exports = SystemKey;