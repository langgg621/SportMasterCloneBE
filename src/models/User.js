// ============================================
// User
// ============================================
class User {
  constructor({ id, fullName, userName, email, phone, address, sex, bonusPoints, membershipRank, createdAt, updatedAt }) {
    this.id = id;
    this.fullName = fullName;
    this.userName = userName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.sex = sex;                       // 0 = Nữ, 1 = Nam
    this.bonusPoints = bonusPoints;
    this.membershipRank = membershipRank; // 1 = Thường, 2 = Vàng, 3 = VIP
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromRow(r) {
    if (!r) return null;
    return new User({
      id: r.UserID,
      fullName: r.FullName,
      userName: r.UserName,
      email: r.Email,
      phone: r.Phone,
      address: r.Address,
      sex: r.Sex,
      bonusPoints: r.BonusPoints,
      membershipRank: r.MembershipRank,
      createdAt: r.CreatedDate,
      updatedAt: r.UpdateDate,
    });
  }

  static fromRows(rows = []) {
    return rows.map(User.fromRow);
  }

  toJSON() {
    return { ...this };
  }

  static validateRegister(data) {
    const errors = [];
    if (!data.fullName || data.fullName.trim().length < 2) errors.push('Họ tên phải từ 2 ký tự');
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) errors.push('Email không hợp lệ');
    if (!data.password || data.password.length < 6) errors.push('Mật khẩu phải từ 6 ký tự');
    if (data.sex != null && ![0, 1].includes(Number(data.sex))) errors.push('Giới tính phải là 0 hoặc 1');
    return errors;
  }
}

// ============================================
// BonusPoint
// ============================================
class BonusPoint {
  constructor({ bonusId, userId, bonusPoint, bonusExpired, isActive }) {
    this.bonusId = bonusId;
    this.userId = userId;
    this.bonusPoint = bonusPoint;
    this.bonusExpired = bonusExpired;
    this.isActive = !!isActive;
  }

  static fromRow(r) {
    if (!r) return null;
    return new BonusPoint({
      bonusId: r.BonusID,
      userId: r.UserID,
      bonusPoint: r.BonusPoint,
      bonusExpired: r.BonusExpired,
      isActive: r.IsActive,
    });
  }

  static fromRows(rows = []) {
    return rows.map(BonusPoint.fromRow);
  }

  toJSON() { return { ...this }; }
}

module.exports = { User, BonusPoint };