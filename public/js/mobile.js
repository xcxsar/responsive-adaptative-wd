/**
 * mobile.js - Lógica cliente ultra-ligera para AWD Mobile
 * NO carga Chart.js ni dependencias pesadas.
 * Proporciona filtrado rápido por píldoras táctiles con cero impacto en el rendimiento.
 */

document.addEventListener('DOMContentLoaded', () => {
  const pillButtons = document.querySelectorAll('.category-pill-btn');
  const cards = document.querySelectorAll('.mobile-card');
  const counter = document.getElementById('mobileCardCounter');

  pillButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      pillButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.dataset.category;
      let visible = 0;

      cards.forEach(card => {
        if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
          card.style.display = 'block';
          visible++;
        } else {
          card.style.display = 'none';
        }
      });

      if (counter) {
        counter.textContent = `${visible} componentes disponibles`;
      }
    });
  });

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
