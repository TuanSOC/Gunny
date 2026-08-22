/**
 * Dữ liệu Tọa Kỵ Gunny (Mount System)
 */
var MountsData = {
maxLevel: 50,
  pillsPerLevel: function(level) {
    if (level <= 10) return level * 10;
    if (level <= 20) return 100 + (level - 10) * 25;
    if (level <= 30) return 350 + (level - 20) * 50;
    if (level <= 40) return 850 + (level - 30) * 90;
    return 1750 + (level - 40) * 150;
  },
  skills: [
    { unlockLevel: 5, name: "Tăng Tốc", desc: "Tăng 50 Nhanh nhẹn trong 2 lượt" },
    { unlockLevel: 15, name: "Giáp Sắt", desc: "Tăng 120 Giáp trong 2 lượt" },
    { unlockLevel: 25, name: "Bạo Kích Thần Tốc", desc: "Tăng 15% Tỷ lệ bạo kích" },
    { unlockLevel: 35, name: "Cường Hóa Sát Thương", desc: "Tăng 200 Sát thương bản thân" },
    { unlockLevel: 50, name: "Thần Kỵ Hộ Thể", desc: "Tạo lá chắn hấp thụ 5000 sát thương" }
  ],
  soulStoneExp: 100
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MountsData;
}
