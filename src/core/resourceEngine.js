/**
 * GUNNY MASTER — Resource Management & Conversion Engine (Phase 1)
 *
 * Provides deterministic calculation for:
 * 1. Inventory tracking & Resource deficit analysis (Required vs Available -> Missing)
 * 2. Multi-tier resource conversion simulation (e.g. Stone -> Copper -> Silver -> Gold -> Gem)
 * 3. Maximum achievable level determination based on available resources
 * 4. Input sanitization & robust validation
 */

var ResourceEngine = {
  /**
   * Calculate difference between required resources and available inventory
   * @param {Object} required - Object of resource amounts needed { stone: 1000, gold: 50, ... }
   * @param {Object} available - Object of resource amounts in inventory { stone: 500, gold: 60, ... }
   * @returns {Object} { isSufficient: boolean, missing: Object, surplus: Object, summary: Array }
   */
  calculateDeficit: function(required = {}, available = {}) {
    const missing = {};
    const surplus = {};
    let isSufficient = true;
    const summary = [];

    // Collect all unique resource keys
    const allKeys = new Set([...Object.keys(required || {}), ...Object.keys(available || {})]);

    for (const key of allKeys) {
      const req = Math.max(0, Number(required[key]) || 0);
      const avail = Math.max(0, Number(available[key]) || 0);
      const diff = avail - req;

      if (diff < 0) {
        isSufficient = false;
        missing[key] = Math.abs(diff);
        surplus[key] = 0;
      } else {
        missing[key] = 0;
        surplus[key] = diff;
      }

      if (req > 0 || avail > 0) {
        summary.push({
          resource: key,
          required: req,
          available: avail,
          missing: missing[key],
          surplus: surplus[key],
          isMet: diff >= 0
        });
      }
    }

    return { isSufficient, missing, surplus, summary };
  },

  /**
   * Multi-Tier Refining Material Conversion Engine
   * Conversion ratios based on Gunny standard:
   * 10 Stone (Đá) -> 1 Copper (Đồng)
   * 10 Copper (Đồng) -> 1 Silver (Bạc)
   * 10 Silver (Bạc) -> 1 Gold (Vàng)
   * 10 Gold (Vàng) -> 1 Gem (Ngọc)
   *
   * @param {Object} inventory - { da: number, dong: number, bac: number, vang: number, ngoc: number }
   * @param {Object} targetNeeds - { da: number, dong: number, bac: number, vang: number, ngoc: number }
   * @returns {Object} { success: boolean, convertedInventory: Object, consumed: Object, missing: Object }
   */
  simulateRefiningConversion: function(inventory = {}, targetNeeds = {}) {
    const inv = {
      da: Math.max(0, Math.floor(Number(inventory.da) || 0)),
      dong: Math.max(0, Math.floor(Number(inventory.dong) || 0)),
      bac: Math.max(0, Math.floor(Number(inventory.bac) || 0)),
      vang: Math.max(0, Math.floor(Number(inventory.vang) || 0)),
      ngoc: Math.max(0, Math.floor(Number(inventory.ngoc) || 0))
    };

    const needs = {
      da: Math.max(0, Math.floor(Number(targetNeeds.da) || 0)),
      dong: Math.max(0, Math.floor(Number(targetNeeds.dong) || 0)),
      bac: Math.max(0, Math.floor(Number(targetNeeds.bac) || 0)),
      vang: Math.max(0, Math.floor(Number(targetNeeds.vang) || 0)),
      ngoc: Math.max(0, Math.floor(Number(targetNeeds.ngoc) || 0))
    };

    const toBaseStone = (res) => (res.da || 0) + (res.dong || 0) * 10 + (res.bac || 0) * 100 + (res.vang || 0) * 1000 + (res.ngoc || 0) * 10000;

    const totalAvailableStones = toBaseStone(inv);
    const totalRequiredStones = toBaseStone(needs);

    // Working simulation pools
    const workingInv = { ...inv };
    const consumed = { da: 0, dong: 0, bac: 0, vang: 0, ngoc: 0 };
    const missing = { da: 0, dong: 0, bac: 0, vang: 0, ngoc: 0 };

    const tiers = ['da', 'dong', 'bac', 'vang', 'ngoc'];

    // Convert from lower tiers upwards if needed
    for (let i = 0; i < tiers.length; i++) {
      const tier = tiers[i];
      const needed = needs[tier];

      // 1. Direct consumption
      if (workingInv[tier] >= needed) {
        workingInv[tier] -= needed;
        consumed[tier] += needed;
      } else {
        const directAvail = workingInv[tier];
        consumed[tier] += directAvail;
        let deficit = needed - directAvail;
        workingInv[tier] = 0;

        // Try to pull and convert from all lower tiers
        for (let j = i - 1; j >= 0; j--) {
          const lowerTier = tiers[j];
          const multiplier = Math.pow(10, i - j); // e.g. da -> bac is 10^2 = 100
          const neededInLower = deficit * multiplier;

          if (workingInv[lowerTier] >= neededInLower) {
            workingInv[lowerTier] -= neededInLower;
            consumed[lowerTier] += neededInLower;
            deficit = 0;
            break;
          } else {
            const availLower = workingInv[lowerTier];
            const convertedUnits = Math.floor(availLower / multiplier);
            const usedLower = convertedUnits * multiplier;
            workingInv[lowerTier] -= usedLower;
            consumed[lowerTier] += usedLower;
            deficit -= convertedUnits;
          }
        }

        if (deficit > 0) {
          missing[tier] = deficit;
        }
      }
    }

    const isSuccess = Object.values(missing).every(v => v === 0);

    return {
      success: isSuccess,
      totalAvailableBaseStones: totalAvailableStones,
      totalRequiredBaseStones: totalRequiredStones,
      remainingInventory: workingInv,
      consumed,
      missing
    };
  },

  /**
   * Determine the maximum achievable level given an inventory and an upgrade table
   * @param {Array} levelRecords - Array of upgrade records e.g. [{ level, da, dong, bac, ... }]
   * @param {Object} inventory - Available resources { da, dong, ... }
   * @param {number} startLevel - Starting level (default 0)
   * @param {string} costKey - Optional single cost key (e.g. 'co' for Pet) or null for multi-resource
   * @returns {Object} { maxLevel: number, totalConsumed: Object, leftover: Object }
   */
  calculateMaxAchievableLevel: function(levelRecords = [], inventory = {}, startLevel = 0, costKey = null) {
    if (!Array.isArray(levelRecords) || levelRecords.length === 0) {
      return { maxLevel: startLevel, totalConsumed: {}, leftover: { ...inventory } };
    }

    let currentLevel = Math.max(0, Number(startLevel) || 0);
    const leftover = JSON.parse(JSON.stringify(inventory || {}));
    const totalConsumed = {};

    // Sort levels ascending
    const sortedLevels = [...levelRecords]
      .filter(r => (r.level || r.tier || 0) > currentLevel)
      .sort((a, b) => (a.level || a.tier || 0) - (b.level || b.tier || 0));

    for (const record of sortedLevels) {
      const targetLv = record.level || record.tier || (currentLevel + 1);

      if (costKey) {
        const cost = Number(record[costKey]) || 0;
        const avail = Number(leftover[costKey]) || 0;
        if (avail >= cost) {
          leftover[costKey] = avail - cost;
          totalConsumed[costKey] = (totalConsumed[costKey] || 0) + cost;
          currentLevel = targetLv;
        } else {
          break; // Insufficient resources
        }
      } else {
        // Multi-resource check (e.g. refining: da, dong, bac, vang, ngoc)
        const keys = Object.keys(record).filter(k => k !== 'level' && k !== 'tier' && typeof record[k] === 'number');
        let canAfford = true;

        for (const k of keys) {
          if ((Number(leftover[k]) || 0) < record[k]) {
            canAfford = false;
            break;
          }
        }

        if (canAfford) {
          for (const k of keys) {
            leftover[k] = (Number(leftover[k]) || 0) - record[k];
            totalConsumed[k] = (totalConsumed[k] || 0) + record[k];
          }
          currentLevel = targetLv;
        } else {
          break;
        }
      }
    }

    return {
      maxLevel: currentLevel,
      levelsAchieved: currentLevel - startLevel,
      totalConsumed,
      leftover
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ResourceEngine;
}
