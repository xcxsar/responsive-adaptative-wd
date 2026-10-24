# Práctica de Laboratorio: RWD vs. AWD (Responsive vs. Adaptive Web Design)

Este repositorio contiene la implementación completa para la evaluación empírica de estrategias de entrega de interfaces web heterogéneas, contrastando **Responsive Web Design (RWD puro)** frente a **Adaptive Web Design (AWD con renderizado condicional en servidor)**.

El caso de estudio modela un **Catálogo de Hardware y Componentes de Servidor para Datacenters e Inteligencia Artificial**.

---

## 1. Fundamento de Arquitectura e Ingeniería

| Característica | Responsive Web Design (RWD) | Adaptive Web Design (AWD) |
| :--- | :--- | :--- |
| **Punto de decisión** | Motor de renderizado en el cliente (Browser). | Servidor web (Node.js/Express) al recibir la petición HTTP. |
| **Payload HTML** | **Unificado e idéntico** para todos los clientes (desktop, tablet, móvil). | **Bifurcado:** Plantilla especializada según User-Agent (`mobile.ejs` vs `desktop.ejs`). |
| **Adaptación de Layout** | Fluid Grids (CSS Grid / Flexbox) y Media Queries fluidas. | DOM optimizado por dispositivo con reglas de layout especializadas. |
| **Sobrecarga en Móvil** | El DOM contiene todos los elementos (gráficos pesados, tablas complejas). Ocultar con `display: none` no evita la descarga de scripts ni recursos. | El servidor **no incluye** en el DOM inicial los gráficos pesados ni la matriz completa de especificaciones para terminales móviles. |
| **Cabeceras HTTP Clave** | `Content-Type: text/html` | `Vary: User-Agent` (para notificar a cachés intermedias y CDNs). |

---

## 2. Estructura del Proyecto

```text
responsive-adaptative-wd/
├── server.js               # Servidor Express con middleware express-useragent y rutas RWD/AWD
├── package.json            # Dependencias y scripts de ejecución
├── data/
│   └── products.js         # 12 productos de hardware con specs técnicas y métricas de benchmark
├── views/
│   ├── index.ejs           # Portal de inicio y resumen de arquitectura
│   ├── responsive.ejs      # Fase 2: Implementación RWD (un único HTML con <picture> y media queries)
│   ├── desktop.ejs         # Fase 3: Implementación AWD Desktop (DOM completo + Chart.js + matriz técnica)
│   └── mobile.ejs          # Fase 3: Implementación AWD Mobile (DOM ligero sin Chart.js ni tabla pesada)
├── public/
│   ├── css/
│   │   ├── base.css        # Variables CSS, diseño base, reset y componentes compartidos
│   │   ├── responsive.css  # Reglas fluidas con breakpoints (<640px, 640-1024px, >1024px)
│   │   ├── desktop.css     # Estilos de alta fidelidad para estaciones desktop
│   │   └── mobile.css      # Hoja de estilos ligera exclusiva para clientes móviles
│   └── js/
│       ├── responsive.js   # Manejo de sidebar colapsable, filtros en vivo y Chart.js
│       ├── desktop.js      # Filtros desktop y renderizado de Chart.js
│       └── mobile.js       # Script ultra-ligero de filtrado táctil por píldoras (sin dependencias)
└── README.md
```

---

## 3. Requisitos y Pila Tecnológica

- **Node.js**: v18.0.0 o superior (desarrollado y validado en v26+)
- **NPM**: v9.0.0 o superior
- **Dependencias**:
  - `express`: Servidor HTTP y enrutamiento.
  - `ejs`: Motor de plantillas para renderizado del lado del servidor (SSR).
  - `express-useragent`: Middleware de inspección de cabeceras HTTP de cliente.
- **Imágenes y Multimedia**:
  - Utiliza la **API abierta de Unsplash CDN** con optimización dinámica de parámetros (`?auto=format&fit=crop&w=...&q=...&fm=webp`), evitando archivos estáticos pesados locales o generación artificial.
- **Visualización de Datos**:
  - `Chart.js` (cargado vía CDN abierta en vistas Desktop y RWD).

---

## 4. Instalación y Ejecución Local

### Paso 1: Clonar o ingresar al repositorio
```bash
cd responsive-adaptative-wd
```

### Paso 2: Instalar dependencias
```bash
npm install
```

### Paso 3: Iniciar el servidor
```bash
npm start
```

Para modo desarrollo con recarga automática:
```bash
npm run dev
```

El servidor quedará disponible en:
```text
http://localhost:3000
```

---

## 5. Rutas Disponibles y Funcionamiento

| Ruta | Descripción | Estrategia |
| :--- | :--- | :--- |
| `http://localhost:3000/` | Portal central de control con detección en vivo de User-Agent y comparativa visual de ambas técnicas. | Hub |
| `http://localhost:3000/responsive` | **Fase 2 (RWD):** Un único archivo HTML consumido por cualquier pantalla. Cuadrícula de 12 tarjetas, `<picture>` con `srcset`, sidebar colapsable y módulo de benchmark. | Client-side RWD |
| `http://localhost:3000/adaptive` | **Fase 3 (AWD):** Detección automática en servidor vía cabecera `User-Agent`. Entrega `mobile.ejs` o `desktop.ejs`. | Server-side AWD |
| `http://localhost:3000/adaptive?view=mobile` | **Fuerza la plantilla móvil de AWD** (ideal para auditar en navegadores de escritorio sin modificar el User-Agent). | AWD Mobile |
| `http://localhost:3000/adaptive?view=desktop` | **Fuerza la plantilla desktop de AWD**. | AWD Desktop |
| `http://localhost:3000/api/products` | Endpoint JSON con los 12 componentes de servidor. | REST API |

---

## 6. Detalles de Implementación Técnica

### Fase 1: Catálogo de Hardware (12 Componentes)
Los componentes incluyen procesadores AMD EPYC e Intel Xeon, aceleradores GPU NVIDIA H100 y A100, unidades NVMe U.2 Enterprise (Samsung, Solidigm), memoria DDR5 ECC Registered (Micron), controladoras RAID LSI MegaRAID, fuentes redundantes Titanium y refrigeración líquida industrial.

### Fase 2: Implementación RWD (`/responsive`)
1. **Puntos de Ruptura (Breakpoints)**:
   - **Móvil (`< 640px`)**: Cuadrícula de 1 columna. La barra lateral de filtros colapsa fluidamente hacia un panel desplegable interactivo mediante el botón `mobileFilterTrigger` sin necesidad de recargar la página.
   - **Tablet (`640px - 1024px`)**: Cuadrícula de 2 columnas con barra de filtros integrada en flujo superior.
   - **Desktop (`> 1024px`)**: Layout con `grid-template-columns: 320px 1fr`, con sidebar fija pegajosa (`position: sticky`) y 3 columnas de tarjetas de producto.
2. **Optimización con `<picture>` y `srcset`**:
   ```html
   <picture>
     <source media="(min-width: 1025px)" srcset="...w=1200&fm=webp" type="image/webp">
     <source media="(min-width: 640px)" srcset="...w=800&fm=webp" type="image/webp">
     <source srcset="...w=400&fm=webp" type="image/webp">
     <img src="...w=800" alt="Hardware" loading="lazy">
   </picture>
   ```
3. **Sobrecarga evaluada**: El DOM contiene la tabla completa de especificaciones (72 filas de datos) y el canvas de `Chart.js`, junto con el script de datos embebido `window.__BENCHMARK_DATA__`.

### Fase 3: Implementación AWD (`/adaptive`)
1. **Detección en Servidor**:
   ```javascript
   // server.js
   app.use(useragent.express());
   
   app.get('/adaptive', (req, res) => {
     res.setHeader('Vary', 'User-Agent');
     const isMobile = req.query.view === 'mobile' || req.useragent.isMobile;
     if (isMobile) {
       return res.render('mobile', { ... });
     }
     return res.render('desktop', { ... });
   });
   ```
2. **Plantilla Móvil (`mobile.ejs`)**:
   - **Exclusión deliberada de DOM pesado**: Ni el gráfico comparativo (`<canvas id="benchmarkChartCanvas">`) ni la tabla detallada de especificaciones viajan en el HTML inicial.
   - **Exclusión de dependencias pesadas**: No se incluye la etiqueta `<script src="chart.umd.min.js">` (ahorro de más de 200 KB en transferencia JS y tiempo de parseo V8).
   - **Imágenes ajustadas a viewport móvil**: Se solicita directamente `w=400` optimizada en WebP.
3. **Resultado de Carga HTML**:
   - `responsive.ejs` (RWD): **~67.0 KB** de documento HTML inicial transferido.
   - `mobile.ejs` (AWD Móvil): **~29.6 KB** de documento HTML inicial transferido.
   - **Reducción de tamaño del documento inicial:** **~55.8% de ahorro neto en bytes HTML**.

---

## 7. Protocolo de Auditoría y Medición (Chrome DevTools / Lighthouse)

Para auditar y completar la tabla de métricas comparativas solicitada en la rúbrica:

1. Abrir **Google Chrome** en modo incógnito (sin extensiones activas).
2. Abrir **DevTools** (`F12` o `Cmd + Option + I`).
3. Activar el **Device Mode** (ícono de móvil/tablet) y configurar:
   - **Dispositivo**: iPhone 12 / 13 Pro o dimensiones personalizadas `390 x 844 px` (DPR: 3.0).
4. En la pestaña **Network**:
   - Seleccionar perfil de red: **Fast 3G** (o throttling simulado de 1.6 Mbps download / 750 kbps upload / 150ms RTT).
   - Marcar casilla **Disable cache**.
5. En la pestaña **Performance / CPU**:
   - Configurar **CPU Throttling**: **4x slowdown**.
6. Realizar la prueba comparando:
   - **Ruta RWD**: `http://localhost:3000/responsive`
   - **Ruta AWD**: `http://localhost:3000/adaptive` (con emulación móvil o `http://localhost:3000/adaptive?view=mobile`).
7. Ejecutar **Lighthouse** en categoría **Performance (Mobile)**.

### Tabla Comparativa de Referencia:

| Métrica / Indicador | RWD (Móvil) | AWD (Móvil) | Delta (%) |
| :--- | :---: | :---: | :---: |
| **Tamaño del documento inicial (HTML transferido)** | ~67.0 KB | ~29.6 KB | **-55.8%** |
| **Peticiones HTTP de Scripts/Librerías pesadas** | Incluye Chart.js (~200 KB) | 0 scripts pesados | **-100% en bibliotecas de gráficos** |
| **Peso total de la página (Payload completo)** | Mayor transferencia por recursos ocultos/scripts | Reducción sustancial enfocada solo en tarjetas móviles | **~ -50% a -65%** |
| **Largest Contentful Paint (LCP)** | Incrementado por contención de red y parseo de DOM grande | Reducido significativamente al priorizar la tarjeta visible | **~ -40% a -60%** |
| **Cumulative Layout Shift (CLS)** | Estable con aspect-ratio en imágenes | 0.00 (layout estático de flujo vertical) | Óptimo |

---

## 8. Licencia
Este proyecto fue desarrollado con fines educativos para la práctica de laboratorio de Arquitectura y Rendimiento Web Frontend. Distribuido bajo licencia MIT.
