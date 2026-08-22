/**
 * Dữ liệu Ma Thạch / Ma Hộp Gunny (Magic Stones)
 */
var MagicStonesData = {
maxLevel: 20,
  expPerLevel: function(level) {
    return level * 500;
  },
  refineCrystalCostPerRoll: 10,
  attributeQuality: [
    { quality: "Trắng", multiplier: 1.0, color: "#ffffff" },
    { quality: "Xanh Lục", multiplier: 1.5, color: "#00ff7f" },
    { quality: "Lam", multiplier: 2.2, color: "#00bfff" },
    { quality: "Tím", multiplier: 3.5, color: "#da70d6" },
    { quality: "Cam (Cực Phẩm)", multiplier: 5.0, color: "#ff8c00" }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MagicStonesData;
}
