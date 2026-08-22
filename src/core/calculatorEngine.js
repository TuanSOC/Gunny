/**
 * CalculatorEngine - Bảng Tra Cứu & Tính Toán Toàn Diện Gunny (Nguồn: PMT)
 * Cung cấp tổng hợp & chi tiết từng bước nâng cấp (Itemized Breakdown).
 */
var CalculatorEngine = {
  // 1. Gia Công / Vòng Tẩy Nạp (Level 1 -> 14)
  calculateRefining: function(startLevel = 0, targetLevel = 14) {
    let totalDa = 0, totalDong = 0, totalBac = 0, totalVang = 0, totalNgoc = 0;
    const breakdown = [];
    if (typeof RefiningData !== 'undefined') {
      RefiningData.levels.forEach(lvInfo => {
        if (lvInfo.level > startLevel && lvInfo.level <= targetLevel) {
          totalDa += lvInfo.da;
          totalDong += lvInfo.dong;
          totalBac += lvInfo.bac;
          totalVang += lvInfo.vang;
          totalNgoc += lvInfo.ngoc;
          breakdown.push({
            step: `Cấp ${lvInfo.level}`,
            da: lvInfo.da,
            dong: lvInfo.dong,
            bac: lvInfo.bac,
            vang: lvInfo.vang,
            ngoc: lvInfo.ngoc,
            cumDa: totalDa,
            cumNgoc: totalNgoc
          });
        }
      });
    }
    return { startLevel, targetLevel, totalDa, totalDong, totalBac, totalVang, totalNgoc, breakdown };
  },

  // 2. Tiến Hóa Pet (Lv 1 -> 50)
  calculatePetEvolution: function(startLevel = 0, targetLevel = 50) {
    let totalCo = 0;
    const breakdown = [];
    if (typeof PetEvolutionData !== 'undefined') {
      PetEvolutionData.levels.forEach(lv => {
        if (lv.level > startLevel && lv.level <= targetLevel) {
          totalCo += lv.co;
          breakdown.push({
            step: `Lv ${lv.level - 1} → Lv ${lv.level}`,
            co: lv.co,
            cumCo: totalCo
          });
        }
      });
    }
    return { startLevel, targetLevel, totalCoThienDiep: totalCo, breakdown };
  },

  // 3. EXP Nâng Ma Thạch (Lv 2 -> 10)
  calculateMagicStoneExp: function(startLevel = 1, targetLevel = 10, rarity = "hoanMy") {
    let totalExp = 0;
    const breakdown = [];
    if (typeof MagicStonesExpData !== 'undefined') {
      MagicStonesExpData.levels.forEach(lv => {
        if (lv.level > startLevel && lv.level <= targetLevel) {
          const val = lv[rarity] || 0;
          totalExp += val;
          breakdown.push({
            step: `Lv ${lv.level - 1} → Lv ${lv.level}`,
            exp: val,
            cumExp: totalExp
          });
        }
      });
    }
    return { startLevel, targetLevel, rarity, totalExpNeeded: totalExp, breakdown };
  },

  // 4. Quy Đổi Châu Báu
  calculateJewelConversion: function(targetName) {
    if (typeof JewelConversionData === 'undefined') return [];
    const item = JewelConversionData.conversions.find(c => c.target === targetName);
    return item ? item.equivalents : [];
  },

  // 5. Up Thú Cưỡi (Lv 1 -> 10)
  calculateMountUp: function(mountType = "ngua", startLevel = 0, targetLevel = 10) {
    let totalPills = 0;
    const breakdown = [];
    const keyMap = {
      caVang: 'ca_vang', ca_vang: 'caVang',
      ca7Mau: 'ca_7_mau', ca_7_mau: 'ca7Mau',
      thamKien: 'tham_kien', tham_kien: 'thamKien',
      thamGa: 'tham_ga', tham_ga: 'thamGa',
      coMayTG: 'co_may_tg', co_may_tg: 'coMayTG'
    };
    if (typeof MountUpData !== 'undefined') {
      MountUpData.levels.forEach(lv => {
        if (lv.level > startLevel && lv.level <= targetLevel) {
          const p = lv[mountType] ?? lv[keyMap[mountType]] ?? 0;
          totalPills += p;
          breakdown.push({
            step: `Cấp ${lv.level}`,
            pills: p,
            cumPills: totalPills
          });
        }
      });
    }
    return { mountType, startLevel, targetLevel, totalPillsNeeded: totalPills, breakdown };
  },

  // 6. Up Phụ Ma (Bậc 1 -> 5)
  calculatePhuMa: function(startBac = 0, targetBac = 5) {
    const tierCosts = [0, 1260, 3400, 8350, 14800, 2000];
    let totalDa = 0;
    const breakdown = [];
    for (let b = startBac + 1; b <= targetBac; b++) {
      if (tierCosts[b]) {
        totalDa += tierCosts[b];
        breakdown.push({
          step: `Bậc ${b}`,
          da: tierCosts[b],
          cumDa: totalDa
        });
      }
    }
    return { startBac, targetBac, totalDaPhuMa: totalDa, breakdown };
  },

  // 7. Up Vật Tổ (Lv 1 -> 50)
  calculateVatTo: function(startLevel = 0, targetLevel = 50) {
    let totalCost1 = 0;
    let totalCost7 = 0;
    const breakdown = [];
    if (typeof VatToData !== 'undefined') {
      VatToData.levels.forEach(lv => {
        if (lv.level > startLevel && lv.level <= targetLevel) {
          const c1 = lv.coc1 || lv.cost || 0;
          const c7 = lv.coc7 || (c1 * 7);
          totalCost1 += c1;
          totalCost7 += c7;
          breakdown.push({
            step: `Lv ${lv.level}`,
            coc1: c1,
            coc7: c7,
            cumCoc1: totalCost1,
            cumCoc7: totalCost7
          });
        }
      });
    }
    return { startLevel, targetLevel, totalCost: totalCost7, totalCost1, totalCost7, breakdown };
  },

  // 8. Đúc Hồn (Đồng, Bạc, Vàng, Kim Cương)
  calculateDucHon: function(tierName = "kimCuong", startLevel = 0, targetLevel = 5) {
    let totalDlh = 0, totalDuc = 0;
    const breakdown = [];
    if (typeof DucHonData !== 'undefined') {
      DucHonData.levels.forEach((lv, idx) => {
        const lvNum = idx + 1;
        if (lvNum > startLevel && lvNum <= targetLevel) {
          const t = lv[tierName];
          if (t) {
            totalDlh += t.dlh;
            totalDuc += t.duc;
            breakdown.push({
              step: `Cấp ${lvNum}`,
              dlh: t.dlh,
              duc: t.duc,
              cumDlh: totalDlh,
              cumDuc: totalDuc
            });
          }
        }
      });
    }
    return { tierName, startLevel, targetLevel, totalDlh, totalDuc, breakdown };
  },

  // 9. Chiến Hồn Đơn (Lv 1 -> 5 & Kim Hồn)
  calculateChienHon: function(mode = "1mon", startLevel = 0, targetLevel = 5) {
    let totalQty = 0;
    const breakdown = [];
    if (typeof ChienHonDonData !== 'undefined') {
      ChienHonDonData.levels.forEach((lv, idx) => {
        const lvNum = idx + 1;
        if (lvNum > startLevel && lvNum <= targetLevel) {
          const val = (mode === "1mon") ? (lv.tu1 || lv.mon1 || 0) : (lv.tu3 || lv.mon3 || 0);
          totalQty += val;
          breakdown.push({
            step: lv.level,
            qty: val,
            cumQty: totalQty
          });
        }
      });
    }
    return { mode, startLevel, targetLevel, totalQty, breakdown };
  },

  // 10. Manh Hóa Pet (Mốc 1 -> 29)
  calculateManhHoa: function(startIdx = 0, targetIdx = 29) {
    let totalQty = 0;
    const breakdown = [];
    if (typeof ManhHoaPetData !== 'undefined') {
      ManhHoaPetData.levels.forEach((r, idx) => {
        const mocNum = idx + 1;
        if (mocNum > startIdx && mocNum <= targetIdx) {
          totalQty += r.qty;
          breakdown.push({
            step: r.range,
            qty: r.qty,
            cumQty: totalQty
          });
        }
      });
    }
    return { startIdx, targetIdx, totalQty, breakdown };
  },

  // 11. Mảnh Ngọc Lam (Cấp 1 -> 9)
  calculateManhNgocLam: function(startLevel = 0, targetLevel = 9) {
    let totalManh = 0;
    const breakdown = [];
    if (typeof ManhNgocLamData !== 'undefined' || typeof NgocData !== 'undefined') {
      const list = (typeof ManhNgocLamData !== 'undefined' ? ManhNgocLamData.levels : NgocData.manhNgocLam) || [];
      list.forEach((r, idx) => {
        const lvNum = idx + 1;
        if (lvNum > startLevel && lvNum <= targetLevel) {
          const m = r.manhCan || r.manh || 0;
          totalManh += m;
          breakdown.push({
            step: r.level,
            manh: m,
            cumManh: totalManh
          });
        }
      });
    }
    return { startLevel, targetLevel, totalManh, breakdown };
  },

  // 12. Miếu Thần / Hóa Thần (Cấp 0 -> 10)
  calculateMieuThan: function(startLevel = 0, targetLevel = 10) {
    let totalVatTe = 0;
    const breakdown = [];
    if (typeof MieuThanData !== 'undefined') {
      MieuThanData.levels.forEach((r, idx) => {
        const lvNum = idx + 1;
        if (lvNum > startLevel && lvNum <= targetLevel) {
          totalVatTe += (r.vatTe || 0);
          breakdown.push({
            step: r.level,
            vatTe: r.vatTe,
            cumVatTe: totalVatTe,
            maKhang: r.maKhang,
            tatKhang: r.tatKhang
          });
        }
      });
    }
    return { startLevel, targetLevel, totalVatTe, breakdown };
  },

  // 13. Pet Linh Hạch (Cấp 1 -> 17)
  calculatePetLinhHach: function(startLevel = 0, targetLevel = 17) {
    let totalManh = 0, totalDa = 0, totalVang = 0;
    const breakdown = [];
    if (typeof PetLinhHachData !== 'undefined') {
      PetLinhHachData.levels.forEach((r, idx) => {
        const lvNum = idx + 1;
        if (lvNum > startLevel && lvNum <= targetLevel) {
          totalManh += (r.manh || 0);
          totalDa += (r.da || 0);
          totalVang += (r.vang || 0);
          breakdown.push({
            step: `Cấp ${lvNum}`,
            manh: r.manh,
            da: r.da,
            vang: r.vang,
            cumDa: totalDa
          });
        }
      });
    }
    return { startLevel, targetLevel, totalManh, totalDa, totalVang, breakdown };
  },

  // 14. Pet Tài Năng (Sách Trí Tuệ Lv 1 -> 10)
  calculatePetTaiNang: function(startLevel = 0, targetLevel = 10) {
    let totalSach = 0;
    const breakdown = [];
    if (typeof PetTaiNangData !== 'undefined') {
      PetTaiNangData.levels.forEach((r, idx) => {
        const lvNum = idx + 1;
        if (lvNum > startLevel && lvNum <= targetLevel) {
          totalSach += (r.sach || 0);
          breakdown.push({
            step: r.level,
            sach: r.sach,
            cumSach: totalSach
          });
        }
      });
    }
    return { startLevel, targetLevel, totalSach, breakdown };
  },

  // 15. Hóa Thần Tu Luyện (Bậc 1 -> 10)
  calculateHoaThanTuLuyen: function(startTier = 0, targetTier = 10) {
    let totalDa = 0;
    const breakdown = [];
    if (typeof HoaThanTuLuyenData !== 'undefined') {
      HoaThanTuLuyenData.tiers.forEach((t, idx) => {
        const tierNum = idx + 1;
        if (tierNum > startTier && tierNum <= targetTier) {
          totalDa += (t.daHoaThan || 0);
          breakdown.push({
            step: t.tier,
            da: t.daHoaThan,
            cumDa: totalDa
          });
        }
      });
    }
    return { startTier, targetTier, totalDa, breakdown };
  },

  // 16. Ngọc Vũ Khí (Lv 1 -> 20)
  calculateNgocVuKhi: function(startLevel = 0, targetLevel = 20) {
    let totalDa = 0;
    const breakdown = [];
    if (typeof NgocVuKhiData !== 'undefined') {
      NgocVuKhiData.levels.forEach((r, idx) => {
        const lvNum = idx + 1;
        if (lvNum > startLevel && lvNum <= targetLevel) {
          totalDa += (r.daCan || 0);
          breakdown.push({
            step: r.level,
            da: r.daCan,
            cumDa: totalDa
          });
        }
      });
    }
    return { startLevel, targetLevel, totalDa, breakdown };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CalculatorEngine;
}
