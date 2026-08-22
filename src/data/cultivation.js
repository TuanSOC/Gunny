/**
 * Dữ liệu Tu Luyện Gunny (Level 1 - 70)
 * Gồm 5 thuộc tính: Tấn Công, Phòng Thủ, Máu, Nhanh Nhẹn, May Mắn
 */
var CultivationData = {
attributes: [
    { id: "attack", name: "Tấn Công", statPerLevel: 8 },
    { id: "defense", name: "Phòng Thủ", statPerLevel: 8 },
    { id: "hp", name: "Máu (HP)", statPerLevel: 45 },
    { id: "agility", name: "Nhanh Nhẹn", statPerLevel: 8 },
    { id: "luck", name: "May Mắn", statPerLevel: 8 }
  ],
  // Châu tu luyện required per level up
  getPillsRequired: function(level) {
    if (level <= 10) return level * 5;
    if (level <= 20) return 50 + (level - 10) * 10;
    if (level <= 30) return 150 + (level - 20) * 20;
    if (level <= 40) return 350 + (level - 30) * 35;
    if (level <= 50) return 700 + (level - 40) * 50;
    if (level <= 60) return 1200 + (level - 50) * 75;
    return 1950 + (level - 60) * 110;
  },
  pillExp: 10, // Mỗi viên Châu Tu Luyện tăng 10 exp tu luyện
  maxLevel: 70
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CultivationData;
}
