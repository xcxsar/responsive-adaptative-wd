/**
 * responsive.js - Lógica del lado del cliente para RWD
 * - Manejo interactivo del sidebar colapsable en móvil sin recargar la página
 * - Filtrado en tiempo real de productos por categoría y rango de precio
 * - Inicialización del gráfico pesado de benchmark mediante Chart.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Manejo del menú colapsable de filtros en móvil
  const mobileFilterTrigger = document.getElementById('mobileFilterTrigger');
  const sidebarFilterPanel = document.getElementById('sidebarFilterPanel');
  const filterIcon = mobileFilterTrigger ? mobileFilterTrigger.querySelector('.filter-icon') : null;

  if (mobileFilterTrigger && sidebarFilterPanel) {
    mobileFilterTrigger.addEventListener('click', () => {
      const isExpanded = sidebarFilterPanel.classList.toggle('is-expanded');
      mobileFilterTrigger.classList.toggle('is-open', isExpanded);
      if (filterIcon) {
        filterIcon.textContent = isExpanded ? '▲' : '▼';
      }
    });
  }

  // 2. Filtrado dinámico de productos
  const categoryCheckboxes = document.querySelectorAll('.filter-checkbox');
  const priceSlider = document.getElementById('priceRangeSlider');
  const priceDisplay = document.getElementById('priceRangeCurrent');
  const resetBtn = document.getElementById('resetFiltersBtn');
  const productCards = document.querySelectorAll('.product-card');

  function parsePrice(str) {
    if (!str) return 0;
    return parseInt(str.replace(/[^0-9]/g, ''), 10) || 0;
  }

  function applyFilters() {
    const selectedCategories = Array.from(categoryCheckboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    const maxPrice = priceSlider ? parseInt(priceSlider.value, 10) : 40000;
    if (priceDisplay) {
      priceDisplay.textContent = `$${maxPrice.toLocaleString()} USD`;
    }

    let visibleCount = 0;
    productCards.forEach(card => {
      const cardCategory = card.dataset.category;
      const cardPrice = parsePrice(card.dataset.price);

      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(cardCategory);
      const priceMatch = cardPrice <= maxPrice;

      if (categoryMatch && priceMatch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const countHeader = document.getElementById('visibleProductsCount');
    if (countHeader) {
      countHeader.textContent = visibleCount;
    }
  }

  categoryCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));
  if (priceSlider) {
    priceSlider.addEventListener('input', applyFilters);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      categoryCheckboxes.forEach(cb => (cb.checked = false));
      if (priceSlider) {
        priceSlider.value = priceSlider.max;
      }
      applyFilters();
    });
  }

  // 3. Inicialización del gráfico pesado de benchmark con Chart.js
  const chartCanvas = document.getElementById('benchmarkChartCanvas');
  if (chartCanvas && typeof Chart !== 'undefined') {
    const ctx = chartCanvas.getContext('2d');
    
    // Obtenemos los datos embebidos en el DOM
    const rawData = window.__BENCHMARK_DATA__ || [];
    const labels = rawData.map(item => item.name);
    const scores = rawData.map(item => item.benchmarkScore);

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Índice de Rendimiento Relativo (Compute / IOPS / Throughput)',
          data: scores,
          backgroundColor: [
            'rgba(37, 99, 235, 0.8)',
            'rgba(6, 182, 212, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(139, 92, 246, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(14, 165, 233, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(234, 179, 8, 0.8)',
            'rgba(99, 102, 241, 0.8)'
          ],
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#9ca3af',
              font: { family: 'system-ui', size: 12 }
            }
          },
          tooltip: {
            backgroundColor: '#111827',
            titleColor: '#f9fafb',
            bodyColor: '#60a5fa',
            borderColor: '#374151',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#9ca3af',
              font: { size: 10 },
              maxRotation: 45,
              minRotation: 20
            },
            grid: { color: 'rgba(55, 65, 81, 0.4)' }
          },
          y: {
            beginAtZero: true,
            max: 105,
            ticks: {
              color: '#9ca3af',
              font: { size: 11 }
            },
            grid: { color: 'rgba(55, 65, 81, 0.4)' }
          }
        }
      }
    });
  }
});
