/**
 * Dữ liệu Dát Vàng Trang Bị Gunny PC (Gold Coating)
 */
var GoldCoatingData = {
items: [
    { id: "weapon", name: "Vũ Khí Dát Vàng", goldStonesNeeded: 100, goldCost: 5000000, statBonus: "+1,200 Sát Thương Base, +500 Tấn Công" },
    { id: "clothes", name: "Áo Dát Vàng", goldStonesNeeded: 80, goldCost: 3000000, statBonus: "+30,000 HP, +400 Phòng Thủ" },
    { id: "hat", name: "Nón Dát Vàng", goldStonesNeeded: 80, goldCost: 3000000, statBonus: "+25,000 HP, +400 Hộ Giáp" }
  ],
  totalGoldStonesForFullCoating: 260,
  totalGoldCostForFullCoating: 11000000
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GoldCoatingData;
}
