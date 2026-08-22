/**
 * Dữ liệu Thẻ Bài Gunny PC (Card System - Cập nhật Mới Nhất)
 */
var CardsData = {
cardSets: [
    {
      id: "khu_rung_ma_thuat",
      name: "Bộ Thẻ Khu Rừng Ma Thuật (MỚI)",
      cardsCount: 5,
      bonusStats: "Tấn công +300, Sát thương Nguyên tố +150, HP +3500",
      starLevels: [
        { star: 1, soulsPerCard: 250, totalCards: 5 },
        { star: 2, soulsPerCard: 600, totalCards: 15 },
        { star: 3, soulsPerCard: 1400, totalCards: 35 },
        { star: 4, soulsPerCard: 3000, totalCards: 75 },
        { star: 5, soulsPerCard: 6000, totalCards: 150 }
      ]
    },
    {
      id: "dau_truong_dung_si",
      name: "Bộ Thẻ Đấu Trường Dũng Sĩ (MỚI)",
      cardsCount: 5,
      bonusStats: "Phòng thủ +280, Xuyên Giáp +120, HP +3000",
      starLevels: [
        { star: 1, soulsPerCard: 200, totalCards: 5 },
        { star: 2, soulsPerCard: 500, totalCards: 15 },
        { star: 3, soulsPerCard: 1200, totalCards: 35 },
        { star: 4, soulsPerCard: 2500, totalCards: 75 },
        { star: 5, soulsPerCard: 5000, totalCards: 150 }
      ]
    },
    {
      id: "vua_ga",
      name: "Bộ Thẻ Vua Gà",
      cardsCount: 5,
      bonusStats: "Tấn công +150, Giáp +80, HP +1200",
      starLevels: [
        { star: 1, soulsPerCard: 100, totalCards: 5 },
        { star: 2, soulsPerCard: 300, totalCards: 15 },
        { star: 3, soulsPerCard: 700, totalCards: 35 },
        { star: 4, soulsPerCard: 1500, totalCards: 75 },
        { star: 5, soulsPerCard: 3000, totalCards: 150 }
      ]
    },
    {
      id: "kien",
      name: "Bộ Thẻ Kiến Vương",
      cardsCount: 5,
      bonusStats: "Phòng thủ +180, May mắn +100, HP +1500",
      starLevels: [
        { star: 1, soulsPerCard: 120, totalCards: 5 },
        { star: 2, soulsPerCard: 350, totalCards: 15 },
        { star: 3, soulsPerCard: 800, totalCards: 35 },
        { star: 4, soulsPerCard: 1800, totalCards: 75 },
        { star: 5, soulsPerCard: 3500, totalCards: 150 }
      ]
    },
    {
      id: "ma_vuong",
      name: "Bộ Thẻ Ma Vương Tộc Gà",
      cardsCount: 5,
      bonusStats: "Sát thương +120, Nhanh nhẹn +140, HP +2000",
      starLevels: [
        { star: 1, soulsPerCard: 200, totalCards: 5 },
        { star: 2, soulsPerCard: 500, totalCards: 15 },
        { star: 3, soulsPerCard: 1200, totalCards: 35 },
        { star: 4, soulsPerCard: 2500, totalCards: 75 },
        { star: 5, soulsPerCard: 5000, totalCards: 150 }
      ]
    },
    {
      id: "phao_thu",
      name: "Bộ Thẻ Pháo Thủ Huyền Thoại",
      cardsCount: 6,
      bonusStats: "Tấn công +250, Sát thương +150, HP +3000",
      starLevels: [
        { star: 1, soulsPerCard: 300, totalCards: 6 },
        { star: 2, soulsPerCard: 800, totalCards: 18 },
        { star: 3, soulsPerCard: 1800, totalCards: 42 },
        { star: 4, soulsPerCard: 3800, totalCards: 90 },
        { star: 5, soulsPerCard: 7500, totalCards: 180 }
      ]
    }
  ],
  soulPointPerCard: 50
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CardsData;
}
