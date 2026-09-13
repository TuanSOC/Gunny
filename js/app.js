/* ============================================================
   PMT GUNNY MASTER WEB APP — Application Main Entry Module
   ============================================================ */

import { initNavigation } from './modules/nav.js';
import { initCalculators } from './modules/calculators.js';
import { initFashionWiki } from './modules/fashion.js';
import { initCyberEffects } from './modules/cyberEffects.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 PMT Gunny Master Web App initializing modular components...');

  // Initialize Cyberpunk Particles & Interactive Spotlights
  initCyberEffects();

  // Initialize Navigation & Command Palette
  initNavigation();

  // Initialize 21 Master Calculators & Itemized Breakdowns
  initCalculators();

  // Initialize Fashion Wiki & Set Viewer
  initFashionWiki();
});

