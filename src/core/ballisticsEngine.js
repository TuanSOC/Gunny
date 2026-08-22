/**
 * BallisticsEngine - Thước Tính Góc & Lực Bắn Chuẩn Xác 100% Gunny PC & Origin
 * Dữ liệu chuẩn xác tuyệt đối từ cẩm nang game Gunny VNG / DDTank Community.
 * Hệ quy chiếu: 1 Màn hình = 10 Cự ly (2 Màn hình = 20 Cự ly).
 */
var BallisticsEngine = {

  // === BẢNG LỰC CHUẨN XÁC TỪNG CỰ LY TỪ 1 ĐẾN 20 (Gió = 0, Bằng Phẳng) ===
  
  // 1. Góc 65°: Góc vua chuẩn nhất Gunny (1 màn = 56 lực, 2 màn = 85 lực)
  _forceMap65: [0, 13, 21, 26, 31.5, 37, 41, 44, 48, 53, 56, 58, 61, 64, 67, 70, 73, 76, 79, 82, 85],

  // 2. Góc 20°: Góc tầm thấp ít chịu gió (1 màn = 54 lực, 2 màn = 80 lực)
  _forceMap20: [0, 10, 19, 25, 30, 36, 40, 44, 48, 51, 54, 57, 60, 63, 66, 69, 72, 74, 76, 78, 80],

  // 3. Góc 30°: Góc đường thẳng (1 màn = 47.5 lực, 2 màn = 72 lực)
  _forceMap30: [0, 14, 20, 24.7, 28.7, 32.3, 35.7, 38.8, 41.8, 44.7, 47.5, 50.2, 52.8, 55.3, 57.9, 60.3, 62.7, 65.7, 67.5, 69.8, 72.1],

  // 4. Góc 50°: Góc tầm trung (1 màn = 52 lực, 2 màn = 83 lực)
  _forceMap50: [0, 12, 18, 23, 28, 33, 37, 41, 45, 48, 52, 56, 59, 62, 65, 68, 71, 74, 77, 80, 83],

  // 5. Góc 70°: Góc chiều sâu (1 màn = 57 lực, 2 màn = 90 lực)
  _forceMap70: [0, 14, 20, 25, 30, 35, 40, 44, 48, 53, 57, 61, 65, 68, 72, 75, 78, 81, 84, 87, 90],

  // === 1. TÍNH GÓC 65 (Công thức: 65 ± Gió × 2) ===
  calculateAngle65: function(distanceSegments, windSpeed, isAgainstWind, heightDiff = 0) {
    const windAdjust = Math.round(windSpeed * 2);
    let finalAngle = isAgainstWind ? 65 - windAdjust : 65 + windAdjust;
    
    // Bù trừ độ cao: lên dốc +H thì tăng góc, xuống dốc -H thì giảm góc
    if (heightDiff > 0) finalAngle += Math.round(heightDiff * 1.5);
    else if (heightDiff < 0) finalAngle += Math.round(heightDiff * 1.5);

    const idx = Math.min(20, Math.max(1, Math.round(distanceSegments)));
    let power = Math.round(this._forceMap65[idx] || 56);
    if (heightDiff > 0) power = Math.min(100, power + heightDiff * 2);

    return {
      formulaCode: '65',
      formulaName: 'Góc 65° Chuẩn',
      features: 'Toàn năng, áp dụng cho mọi địa hình',
      recommendedAngle: Math.max(20, Math.min(89, finalAngle)),
      recommendedPower: power,
      windAdjust: windAdjust,
      windNote: isAgainstWind
        ? `Gió ngược ${windSpeed.toFixed(1)}: Trừ ${windAdjust} góc (65 - ${windAdjust} = ${finalAngle}°)`
        : `Gió xuôi ${windSpeed.toFixed(1)}: Cộng ${windAdjust} góc (65 + ${windAdjust} = ${finalAngle}°)`
    };
  },

  // === 2. TÍNH GÓC 20 (Công thức: Góc 20 cố định, Bù lực ± Gió × 1.2) ===
  calculateAngle20: function(distanceSegments, windSpeed, isAgainstWind, heightDiff = 0) {
    const idx = Math.min(20, Math.max(1, Math.round(distanceSegments)));
    let basePower = this._forceMap20[idx] || 54;
    const windPowerAdjust = Math.round(windSpeed * 1.2);
    let finalPower = isAgainstWind ? basePower + windPowerAdjust : basePower - windPowerAdjust;
    if (heightDiff > 0) finalPower += heightDiff * 2.5;

    return {
      formulaCode: '20',
      formulaName: 'Góc 20° Siêu Thấp',
      features: 'Kháng gió cực mạnh, góc bắn thấp',
      recommendedAngle: 20,
      recommendedPower: Math.min(100, Math.max(10, Math.round(finalPower))),
      windAdjust: windPowerAdjust,
      windNote: isAgainstWind
        ? `Gió ngược: Tăng lực +${windPowerAdjust} (Góc 20° cố định)`
        : `Gió xuôi: Giảm lực -${windPowerAdjust} (Góc 20° cố định)`
    };
  },

  // === 3. TÍNH GÓC 30 (Công thức: 30 ± Gió) ===
  calculateAngle30: function(distanceSegments, windSpeed, isAgainstWind, heightDiff = 0) {
    const idx = Math.min(20, Math.max(1, Math.round(distanceSegments)));
    let basePower = Math.round(this._forceMap30[idx] || 48);
    const windAdjust = Math.round(windSpeed);
    let finalAngle = isAgainstWind ? 30 - windAdjust : 30 + windAdjust;
    if (heightDiff > 0) basePower += heightDiff * 2.0;

    return {
      formulaCode: '30',
      formulaName: 'Góc 30° Đường Thẳng',
      features: 'Đường đạn thẳng, đục chân và đào đất',
      recommendedAngle: Math.max(15, Math.min(45, finalAngle)),
      recommendedPower: Math.min(100, Math.max(10, basePower)),
      windAdjust: windAdjust,
      windNote: isAgainstWind
        ? `Gió ngược: Trừ ${windAdjust} góc (30 - ${windAdjust} = ${finalAngle}°)`
        : `Gió xuôi: Cộng ${windAdjust} góc (30 + ${windAdjust} = ${finalAngle}°)`
    };
  },

  // === 4. SIÊU CAO GÓC 90 (Công thức: Góc = 90 - Kc ± Gió × 2, Lực 95) ===
  calculateHighToss90: function(distanceSegments, windSpeed, isAgainstWind, heightDiff = 0) {
    const dist = Math.min(20, Math.max(1, Math.round(distanceSegments)));
    let baseAngle = 90 - dist;
    const windAngle = Math.round(windSpeed * 2);
    let finalAngle = isAgainstWind ? baseAngle - windAngle : baseAngle + windAngle;
    if (heightDiff > 0) finalAngle += Math.round(heightDiff * 1.0);
    else if (heightDiff < 0) finalAngle += Math.round(heightDiff * 1.0);

    return {
      formulaCode: '90',
      formulaName: 'Siêu Cao (Góc 90°)',
      features: 'Siêu cao né địa hình cản trở, đạn rơi thẳng đứng',
      recommendedAngle: Math.max(30, Math.min(89, finalAngle)),
      recommendedPower: 95,
      windAdjust: windAngle,
      windNote: `Lực kéo 95 (Full). Góc = 90 - ${dist} ${isAgainstWind ? '-' : '+'} ${windAngle} = ${finalAngle}°`
    };
  },

  // === 5. GÓC 50 (Công thức: 50 ± Gió × 2) ===
  calculateAngle50: function(distanceSegments, windSpeed, isAgainstWind, heightDiff = 0) {
    const windAngle = Math.round(windSpeed * 2);
    let finalAngle = isAgainstWind ? 50 - windAngle : 50 + windAngle;
    if (heightDiff > 0) finalAngle += Math.round(heightDiff * 1.5);
    else if (heightDiff < 0) finalAngle += Math.round(heightDiff * 1.5);

    const idx = Math.min(20, Math.max(1, Math.round(distanceSegments)));
    let power = Math.round(this._forceMap50[idx] || 52);
    if (heightDiff > 0) power = Math.min(100, power + heightDiff * 2);

    return {
      formulaCode: '50',
      formulaName: 'Góc 50° Tầm Trung',
      features: 'Tầm trung ổn định, kiểm soát lực tốt',
      recommendedAngle: Math.max(20, Math.min(89, finalAngle)),
      recommendedPower: power,
      windAdjust: windAngle,
      windNote: isAgainstWind
        ? `Gió ngược ${windSpeed.toFixed(1)}: Trừ ${windAngle} góc → ${finalAngle}°`
        : `Gió xuôi ${windSpeed.toFixed(1)}: Cộng ${windAngle} góc → ${finalAngle}°`
    };
  },

  // === 6. TÍNH GÓC 70 (Công thức: 70 ± Gió × 2) ===
  calculateAngle70: function(distanceSegments, windSpeed, isAgainstWind, heightDiff = 0) {
    const windAdjust = Math.round(windSpeed * 2);
    let finalAngle = isAgainstWind ? 70 - windAdjust : 70 + windAdjust;
    if (heightDiff > 0) finalAngle += Math.round(heightDiff * 1.5);
    else if (heightDiff < 0) finalAngle += Math.round(heightDiff * 1.5);

    const idx = Math.min(20, Math.max(1, Math.round(distanceSegments)));
    let power = Math.round(this._forceMap70[idx] || 57);
    if (heightDiff > 0) power = Math.min(100, power + heightDiff * 2);

    return {
      formulaCode: '70',
      formulaName: 'Góc 70° Chiều Sâu',
      features: 'Góc chiều sâu, cực mạnh khi bắn Lựu Đạn / Tivi',
      recommendedAngle: Math.max(20, Math.min(89, finalAngle)),
      recommendedPower: power,
      windAdjust: windAdjust,
      windNote: isAgainstWind
        ? `Gió ngược ${windSpeed.toFixed(1)}: Trừ ${windAdjust} góc → ${finalAngle}°`
        : `Gió xuôi ${windSpeed.toFixed(1)}: Cộng ${windAdjust} góc → ${finalAngle}°`
    };
  },

  /**
   * Tính toán theo công thức góc đang được chọn
   */
  calculateAngle: function(distanceSegments, windSpeed, windDir, formula, heightDiff = 0) {
    const isAgainstWind = (windDir === 'NGUOC');
    switch (String(formula)) {
      case '20': return this.calculateAngle20(distanceSegments, windSpeed, isAgainstWind, heightDiff);
      case '30': return this.calculateAngle30(distanceSegments, windSpeed, isAgainstWind, heightDiff);
      case '50': return this.calculateAngle50(distanceSegments, windSpeed, isAgainstWind, heightDiff);
      case '70': return this.calculateAngle70(distanceSegments, windSpeed, isAgainstWind, heightDiff);
      case '90': return this.calculateHighToss90(distanceSegments, windSpeed, isAgainstWind, heightDiff);
      default:   return this.calculateAngle65(distanceSegments, windSpeed, isAgainstWind, heightDiff);
    }
  },

  /**
   * Tính và so sánh cùng lúc toàn bộ các công thức
   */
  compareAllFormulas: function(distanceSegments, windSpeed, windDir, heightDiff = 0) {
    return [
      this.calculateAngle(distanceSegments, windSpeed, windDir, '65', heightDiff),
      this.calculateAngle(distanceSegments, windSpeed, windDir, '70', heightDiff),
      this.calculateAngle(distanceSegments, windSpeed, windDir, '50', heightDiff),
      this.calculateAngle(distanceSegments, windSpeed, windDir, '30', heightDiff),
      this.calculateAngle(distanceSegments, windSpeed, windDir, '20', heightDiff),
      this.calculateAngle(distanceSegments, windSpeed, windDir, '90', heightDiff)
    ];
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BallisticsEngine;
}
