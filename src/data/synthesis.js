/**
 * Dữ liệu Hợp Thành Gunny (Đá Hợp Thành 10 -> 50)
 */
var SynthesisData = {
types: ["Hỏa Châu (Tấn Công)", "Thủy Châu (Phòng Thủ)", "Phong Châu (Nhanh Nhẹn)", "Thổ Châu (May Mắn)"],
  stones: [
    { name: "Đá Hợp Thành 10", statGain: 10, baseSuccessRate: 0.80, gold: 500 },
    { name: "Đá Hợp Thành 20", statGain: 20, baseSuccessRate: 0.60, gold: 1200 },
    { name: "Đá Hợp Thành 30", statGain: 30, baseSuccessRate: 0.40, gold: 2500 },
    { name: "Đá Hợp Thành 40", statGain: 40, baseSuccessRate: 0.25, gold: 5000 },
    { name: "Đá Hợp Thành 50", statGain: 50, baseSuccessRate: 0.15, gold: 10000 }
  ],
  maxSynthesisPerItem: 4 // Mỗi đồ gồm 4 thuộc tính hỏa, thủy, phong, thổ
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SynthesisData;
}
