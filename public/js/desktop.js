/**
 * desktop.js - Lógica cliente para AWD Desktop
 * Manejo de filtros desktop e inicialización de Chart.js
 */

document.addEventListener('DOMContentLoaded', () => {
  const categoryCheckboxes = document.querySelectorAll('.desktop-filter-checkbox');
  const priceSlider = document.getElementById('desktopPriceSlider');
  const priceDisplay = document.getElementById('desktopPriceDisplay');
  const resetBtn = document.getElementById('desktopResetBtn');
  const productCards = document.querySelectorAll('.product-card');

  function parsePrice(str) {
    if (!str) return 0;
    return parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
  }

  function applyFilters() {
    const selected = Array.from(categoryCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    const maxPrice = priceSlider ? parseInt(priceSlider.value, 10) : 40000;
    if (priceDisplay) {
      priceDisplay.textContent = `$${maxPrice.toLocaleString()} USD`;
    }

    let count = 0;
    productCards.forEach(card => {
      const cat = card.dataset.category;
      const price = parsePrice(card.dataset.price);

      const catOk = selected.length === 0 || selected.includes(cat);
      const priceOk = price <= maxPrice;

      if (catOk && priceOk) {
        card.style.display = 'flex';
        count++;
      } else {
        card.style.display = 'none';
      }
    });

    const counter = document.getElementById('desktopCountDisplay');
    if (counter) counter.textContent = count;
  }

  categoryCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));
  if (priceSlider) priceSlider.addEventListener('input', applyFilters);
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      categoryCheckboxes.forEach(cb => (cb.checked = false));
      if (priceSlider) priceSlider.value = priceSlider.max;
      applyFilters();
    });
  }

  // Chart.js initialization
  const chartCanvas = document.getElementById('desktopBenchmarkCanvas');
  if (chartCanvas && typeof Chart !== 'undefined') {
    const ctx = chartCanvas.getContext('2d');
    const rawData = window.__BENCHMARK_DATA__ || [];
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: rawData.map(d => d.name),
        datasets: [{
          label: 'Rendimiento Sintético de Servidor (Compute / IOPS / Throughput Index)',
          data: rawData.map(d => d.benchmarkScore),
          backgroundColor: 'rgba(59, 130, 246, 0.85)',
          borderColor: '#3b82f6',
          borderWidth: 1,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#9ca3af' } }
        },
        scales: {
          x: { ticks: { color: '#9ca3af', font: { size: 10 } }, grid: { color: 'rgba(55,65,81,0.3)' } },
          y: { beginAtZero: true, max: 105, ticks: { color: '#9ca3af' }, grid: { color: 'rgba(55,65,81,0.3)' } }
        }
      }
    });
  }
});
