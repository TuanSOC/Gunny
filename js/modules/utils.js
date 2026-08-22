/* ============================================================
   PMT GUNNY MASTER — State & UI Utilities Module
   ============================================================ */

export function save(k, v) {
  try {
    localStorage.setItem(`pmt_${k}`, JSON.stringify(v));
  } catch (_) {}
}

export function load(k, def) {
  try {
    const s = localStorage.getItem(`pmt_${k}`);
    if (s !== null) return JSON.parse(s);
  } catch (_) {}
  return def;
}

export function animateCount(el, from, to, duration = 400) {
  if (!el) return;
  const startVal = typeof from === 'number' ? from : (parseInt(el.textContent.replace(/,/g, '')) || 0);
  const endVal = typeof to === 'number' ? to : 0;
  const diff = endVal - startVal;
  if (!diff) {
    el.textContent = endVal.toLocaleString();
    return;
  }
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(startVal + diff * ease).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = endVal.toLocaleString();
  }
  requestAnimationFrame(tick);
}

export function showToast(message, type = 'gold') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item ${type}`;
  toast.innerHTML = `<span class="toast-icon">⚡</span><span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 350);
  }, 2400);
}

export function formatNumber(num) {
  return (Number(num) || 0).toLocaleString();
}

