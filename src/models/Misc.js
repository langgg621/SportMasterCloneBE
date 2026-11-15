// ============================================
// ProfileMenuItem
// ============================================
class ProfileMenuItem {
  constructor({ id, title, icon, badgeText, isNew, sortOrder, isActive }) {
    this.id = id;
    this.title = title;
    this.icon = icon;
    this.badgeText = badgeText;
    this.isNew = !!isNew;
    this.sortOrder = sortOrder;
    this.isActive = !!isActive;
  }

  static fromRow(r) {
    if (!r) return null;
    return new ProfileMenuItem({
      id: r.MenuID,
      title: r.Title,
      icon: r.Icon,
      badgeText: r.BadgeText,
      isNew: r.IsNew,
      sortOrder: r.SortOrder,
      isActive: r.IsActive,
    });
  }

  static fromRows(rows = []) {
    return rows.map(ProfileMenuItem.fromRow);
  }

  toJSON() { return { ...this }; }
}

// ============================================
// AppSetting
// ============================================
class AppSetting {
  constructor({ key, value, description }) {
    this.key = key;
    this.value = value;
    this.description = description;
  }

  static fromRow(r) {
    if (!r) return null;
    return new AppSetting({
      key: r.SettingKey,
      value: r.SettingValue,
      description: r.Description,
    });
  }

  static fromRows(rows = []) {
    return rows.map(AppSetting.fromRow);
  }

  toJSON() { return { ...this }; }
}

module.exports = { ProfileMenuItem, AppSetting };