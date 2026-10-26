/**
 * mobile.js - Lógica cliente ultra-ligera para AWD Mobile
 * NO carga Chart.js ni dependencias pesadas.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Notificación simple en botón de compra
  document.querySelectorAll('.mobile-card-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const originalText = e.target.textContent;
      e.target.textContent = '✓ Agregado al rack';
      e.target.style.backgroundColor = 'var(--brand-success)';
      setTimeout(() => {
        e.target.textContent = originalText;
        e.target.style.backgroundColor = '';
      }, 1500);
    });
  });
});
