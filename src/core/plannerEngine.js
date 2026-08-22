/**
 * GUNNY MASTER — Character Planner & Multi-Goal Engine (Phase 1)
 *
 * Provides deterministic calculation for:
 * 1. Character profile schema management (versioned schema)
 * 2. Multi-goal planning across all 17 Gunny upgrade systems
 * 3. Unified resource aggregation
 * 4. Step-by-step progress tracking (%)
 */

var PlannerEngine = {
  SCHEMA_VERSION: 1,

  /**
   * System level bounds and metadata
   */
  SYSTEM_METADATA: {
    refining:      { name: "Gia Công", min: 0, max: 14, unit: "Cấp", resourceName: "Đá / Đồng / Bạc / Vàng / Ngọc" },
    pet:           { name: "Tiến Hóa Pet", min: 1, max: 50, unit: "Cấp", resourceName: "Cỏ Thiên Điệp" },
    mount:         { name: "Thú Cưỡi (Ngựa)", min: 0, max: 10, unit: "Cấp", resourceName: "Thuốc Tọa Kỵ" },
    phuMa:         { name: "Phụ Ma", min: 0, max: 5, unit: "Bậc", resourceName: "Đá Phụ Ma" },
    vatTo:         { name: "Vật Tổ", min: 0, max: 50, unit: "Cấp", resourceName: "Xu / Vé (Cóc)" },
    ducHon:        { name: "Đúc Hồn (Vũ Khí)", min: 0, max: 5, unit: "Bậc", resourceName: "Kim Cương Đúc Hồn" },
    chienHon:      { name: "Chiến Hồn Đơn", min: 0, max: 100, unit: "Cấp", resourceName: "Chiến Hồn Đơn" },
    manhHoa:       { name: "Manh Hóa Pet", min: 0, max: 50, unit: "Mốc", resourceName: "Mảnh Manh Hóa" },
    ngocThuCuoi:   { name: "Ngọc Thú Cưỡi", min: 0, max: 25, unit: "Cấp", resourceName: "Mảnh Ngọc Thú Cưỡi" },
    manhNgocLam:   { name: "Mảnh Ngọc Lam", min: 0, max: 25, unit: "Cấp", resourceName: "Mảnh Ngọc Lam" },
    mieuThan:      { name: "Miếu Thần", min: 0, max: 20, unit: "Cấp", resourceName: "Vật Tế Miếu Thần" },
    petLinhHach:   { name: "Linh Hạch Pet", min: 0, max: 10, unit: "Bậc", resourceName: "Linh Ngọc / Mảnh" },
    petTaiNang:    { name: "Tài Năng Pet", min: 0, max: 100, unit: "Cấp", resourceName: "Sách Trí Tuệ" },
    hoaThan:       { name: "Hóa Thần Tu Luyện", min: 0, max: 10, unit: "Bậc", resourceName: "Đá Hóa Thần" },
    ngocVuKhi:     { name: "Ngọc Vũ Khí", min: 0, max: 20, unit: "Cấp", resourceName: "Đá Ngọc Vũ Khí" },
    thanHoMenh:    { name: "Thần Hộ Mệnh", min: 1, max: 70, unit: "Cấp", resourceName: "EXP Thần Hộ Mệnh" },
    linhBao:       { name: "Linh Bảo (THM)", min: 1, max: 50, unit: "Cấp", resourceName: "Pha Lê / Linh Nguyên" }
  },

  /**
   * Create a new blank or default character profile
   */
  createDefaultCharacter: function(name = "Gunner PMT") {
    return {
      version: this.SCHEMA_VERSION,
      id: "char_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
      name: (name || "Gunner PMT").trim(),
      level: 70,
      battlePower: 5000000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      systems: {
        refining: 0,
        pet: 1,
        mount: 0,
        phuMa: 0,
        vatTo: 0,
        ducHon: 0,
        chienHon: 0,
        manhHoa: 0,
        ngocThuCuoi: 0,
        manhNgocLam: 0,
        mieuThan: 0,
        petLinhHach: 0,
        petTaiNang: 0,
        hoaThan: 0,
        ngocVuKhi: 0,
        thanHoMenh: 1,
        linhBao: 1
      }
    };
  },

  /**
   * Calculate progress percentage between current and target
   */
  calculateProgressPercent: function(current, target, base = 0) {
    const cur = Number(current) || 0;
    const tgt = Number(target) || 0;
    const b = Number(base) || 0;

    if (tgt <= b) return 100;
    if (cur >= tgt) return 100;
    if (cur <= b) return 0;

    const pct = Math.round(((cur - b) / (tgt - b)) * 100);
    return Math.min(100, Math.max(0, pct));
  },

  /**
   * Plan multiple upgrade goals from current character state to target goals
   * @param {Object} currentSystems - e.g. { refining: 5, pet: 20, mount: 3 }
   * @param {Object} targetGoals - e.g. { refining: 10, pet: 40, mount: 8 }
   * @param {Object} [calcEngine] - CalculatorEngine instance (falls back to global)
   * @returns {Object} Full plan with per-system breakdown and unified resource totals
   */
  planMultiGoals: function(currentSystems = {}, targetGoals = {}, calcEngine = null) {
    const engine = calcEngine || (typeof CalculatorEngine !== 'undefined' ? CalculatorEngine : null);
    const plan = {
      systemPlans: {},
      aggregatedResources: {},
      totalUpgradesCount: 0,
      overallProgress: 100
    };

    if (!engine) return plan;

    const allKeys = Object.keys(this.SYSTEM_METADATA);
    let totalTargetSteps = 0;
    let totalCompletedSteps = 0;

    for (const key of allKeys) {
      const meta = this.SYSTEM_METADATA[key];
      const cur = Math.max(meta.min, Math.min(meta.max, Number(currentSystems[key]) || meta.min));
      const tgt = Math.max(cur, Math.min(meta.max, Number(targetGoals[key]) || cur));

      const stepsNeeded = tgt - cur;
      totalTargetSteps += (tgt - meta.min);
      totalCompletedSteps += (cur - meta.min);

      if (stepsNeeded > 0) {
        let result = null;
        const requiredRes = {};

        switch (key) {
          case 'refining':
            result = engine.calculateRefining(cur, tgt);
            requiredRes['da'] = result.totalDa;
            requiredRes['dong'] = result.totalDong;
            requiredRes['bac'] = result.totalBac;
            requiredRes['vang'] = result.totalVang;
            requiredRes['ngoc'] = result.totalNgoc;
            break;

          case 'pet':
            result = engine.calculatePetEvolution(cur, tgt);
            requiredRes['coThienDiep'] = result.totalCoThienDiep ?? result.totalGrassNeeded ?? result.totalCo ?? 0;
            break;

          case 'mount':
            result = engine.calculateMountUp('ngua', cur, tgt);
            requiredRes['thuocToaKy'] = result.totalPillsNeeded;
            break;

          case 'phuMa':
            result = engine.calculatePhuMa(cur, tgt);
            requiredRes['daPhuMa'] = result.totalDaPhuMa;
            break;

          case 'vatTo':
            result = engine.calculateVatTo(cur, tgt);
            requiredRes['xuVatTo'] = result.totalCost7;
            break;

          case 'ducHon':
            result = engine.calculateDucHon('vuKhi', cur, tgt);
            requiredRes['kimCuongDucHon'] = result.totalMaterials;
            break;

          case 'chienHon':
            result = engine.calculateChienHon(cur, tgt, '1tu');
            requiredRes['chienHonDon'] = result.totalChienHon;
            break;

          case 'manhHoa':
            result = engine.calculateManhHoa(cur, tgt);
            requiredRes['diemManhHoa'] = result.totalDiem;
            break;

          case 'ngocThuCuoi':
            result = engine.calculateNgoc('ngoc_thu_cuoi', cur, tgt);
            requiredRes['manhNgocThuCuoi'] = result.totalManh;
            break;

          case 'manhNgocLam':
            result = engine.calculateNgoc('manh_ngoc_lam', cur, tgt);
            requiredRes['manhNgocLam'] = result.totalManh;
            break;

          case 'mieuThan':
            result = engine.calculateMieuThan(cur, tgt);
            requiredRes['vatTeMieuThan'] = result.totalVatTe;
            break;

          case 'petLinhHach':
            result = engine.calculatePetLinhHach(cur, tgt);
            requiredRes['linhNgoc'] = result.totalLinhNgoc;
            break;

          case 'petTaiNang':
            result = engine.calculatePetTaiNang(cur, tgt);
            requiredRes['sachTriTue'] = result.totalSach;
            break;

          case 'hoaThan':
            result = engine.calculateHoaThanTuLuyen(cur, tgt);
            requiredRes['daHoaThan'] = result.totalDa;
            break;

          case 'ngocVuKhi':
            result = engine.calculateNgocVuKhi(cur, tgt);
            requiredRes['daNgocVuKhi'] = result.totalDa;
            break;

          case 'thanHoMenh':
            result = engine.calculateThanHoMenh(cur, tgt, '5Star');
            requiredRes['expThanHoMenh'] = result.totalExpNeeded;
            break;

          case 'linhBao':
            result = engine.calculateThanHoMenh(cur, tgt, '5Star');
            requiredRes['phaLe'] = result.totalPhaLe;
            if (result.totalLinhNguyen > 0) {
              requiredRes['linhNguyen'] = result.totalLinhNguyen;
            }
            break;
        }

        if (result) {
          plan.systemPlans[key] = {
            systemName: meta.name,
            currentLevel: cur,
            targetLevel: tgt,
            steps: stepsNeeded,
            unit: meta.unit,
            requiredResources: requiredRes,
            breakdown: result.breakdown || []
          };

          plan.totalUpgradesCount += stepsNeeded;

          // Merge into aggregated resources
          for (const [resKey, amount] of Object.entries(requiredRes)) {
            plan.aggregatedResources[resKey] = (plan.aggregatedResources[resKey] || 0) + (Number(amount) || 0);
          }
        }
      }
    }

    plan.overallProgress = totalTargetSteps > 0 ? Math.round((totalCompletedSteps / totalTargetSteps) * 100) : 100;

    return plan;
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PlannerEngine;
}
