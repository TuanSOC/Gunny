/* ============================================================
   PMT GUNNY MASTER WEB APP — Application Main Entry Module
   ============================================================ */

import { initNavigation } from './modules/nav.js';
import { initCalculators } from './modules/calculators.js';
import { initBallistics } from './modules/ballistics.js';
import { initFashionWiki } from './modules/fashion.js';
import { initCyberEffects } from './modules/cyberEffects.js';
import { initCharacterPlanner } from './modules/planner.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 PMT Gunny Master Web App initializing modular components...');

  // Initialize Cyberpunk Particles & Interactive Spotlights
  initCyberEffects();

  // Initialize Navigation, Command Palette & Goal Bag
  initNavigation();

  // Initialize Character Planner & Multi-Goals
  initCharacterPlanner();

  // Initialize 17 Master Calculators & Itemized Breakdowns
  initCalculators();

  // Initialize Angle & Wind Ballistics Ruler
  initBallistics();

  // Initialize Fashion Wiki & Set Viewer
  initFashionWiki();
});

