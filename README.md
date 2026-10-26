# Práctica de Laboratorio: RWD vs. AWD (Responsive vs. Adaptive Web Design)

Este repositorio contiene la implementación completa para la evaluación empírica de estrategias de entrega de interfaces web heterogéneas, contrastando **Responsive Web Design (RWD puro)** frente a **Adaptive Web Design (AWD con renderizado condicional en servidor)**.

El caso de estudio modela un **Catálogo de Hardware y Componentes de Servidor para Datacenters e Inteligencia Artificial**.

---

## 1. Instalación y Ejecución Local

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

## 2. Fundamento de Arquitectura e Ingeniería

| Característica           | Responsive Web Design (RWD)                                                                                                                        | Adaptive Web Design (AWD)                                                                                                            |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Punto de decisión**    | Motor de renderizado en el cliente (Browser).                                                                                                      | Servidor web (Node.js/Express) al recibir la petición HTTP.                                                                          |
| **Payload HTML**         | **Unificado e idéntico** para todos los clientes (desktop, tablet, móvil).                                                                         | **Bifurcado:** Plantilla especializada según User-Agent (`mobile.ejs` vs `desktop.ejs`).                                             |
| **Adaptación de Layout** | Fluid Grids (CSS Grid / Flexbox) y Media Queries fluidas.                                                                                          | DOM optimizado por dispositivo con reglas de layout especializadas.                                                                  |
| **Sobrecarga en Móvil**  | El DOM contiene todos los elementos (gráficos pesados, tablas complejas). Ocultar con `display: none` no evita la descarga de scripts ni recursos. | El servidor **no incluye** en el DOM inicial los gráficos pesados ni la matriz completa de especificaciones para terminales móviles. |
| **Cabeceras HTTP Clave** | `Content-Type: text/html`                                                                                                                          | `Vary: User-Agent` (para notificar a cachés intermedias y CDNs).                                                                     |

---

## 3. Estructura del Proyecto

```text
responsive-adaptative-wd/
├── server.js               # Servidor Express con middleware express-useragent y rutas RWD/AWD
├── package.json            # Dependencias y scripts de ejecución
├── data/
│   └── products.js         # 12 productos de hardware con specs técnicas y métricas de benchmark
├── views/
│   ├── index.ejs           # Portal de inicio y resumen de arquitectura
│   ├── responsive.ejs      # Fase 2: Implementación RWD (un único HTML con imágenes locales y media queries)
│   ├── desktop.ejs         # Fase 3: Implementación AWD Desktop (DOM completo + Chart.js + matriz técnica)
│   └── mobile.ejs          # Fase 3: Implementación AWD Mobile (DOM ligero sin Chart.js ni tabla pesada)
├── public/
│   ├── css/
│   │   ├── base.css        # Variables CSS, diseño base, reset y componentes compartidos
│   │   ├── responsive.css  # Reglas fluidas con breakpoints (<640px, 640-1024px, >1024px)
│   │   ├── desktop.css     # Estilos de alta fidelidad para estaciones desktop
│   │   └── mobile.css      # Hoja de estilos ligera exclusiva para clientes móviles
│   └── js/
│       ├── responsive.js   # Inicialización del gráfico de benchmarks (Chart.js)
│       ├── desktop.js      # Renderizado de Chart.js en la vista desktop
│       └── mobile.js       # Script ultra-ligero de interacción de tarjetas (sin dependencias)
└── README.md
```

---

## 4. Requisitos y Pila Tecnológica

- **Node.js**: v18.0.0 o superior (desarrollado y validado en v26+)
- **NPM**: v9.0.0 o superior
- **Dependencias**:
  - `express`: Servidor HTTP y enrutamiento.
  - `ejs`: Motor de plantillas para renderizado del lado del servidor (SSR).
  - `express-useragent`: Middleware de inspección de cabeceras HTTP de cliente.
- **Imágenes y Multimedia**:
  - Archivos locales servidos desde la carpeta `/img` mediante la ruta estática `/img` de Express. Todas las tarjetas usan la misma relación de aspecto (`16:10`) y `object-fit: cover`, por lo que el recorte es uniforme aunque las fotografías originales tengan dimensiones distintas.
- **Visualización de Datos**:
  - `Chart.js` (cargado vía CDN abierta en vistas Desktop y RWD).

---

## 5. Rutas Disponibles y Funcionamiento

| Ruta                                          | Descripción                                                                                                                                                    | Estrategia      |
| :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| `http://localhost:3000/`                      | Portal central de control con detección en vivo de User-Agent y comparativa visual de ambas técnicas.                                                          | Hub             |
| `http://localhost:3000/responsive`            | **Fase 2 (RWD):** Un único archivo HTML consumido por cualquier pantalla. Cuadrícula de 12 tarjetas, imágenes locales con recorte 16:10 y módulo de benchmark. | Client-side RWD |
| `http://localhost:3000/adaptive`              | **Fase 3 (AWD):** Detección automática en servidor vía cabecera `User-Agent`. Entrega `mobile.ejs` o `desktop.ejs`.                                            | Server-side AWD |
| `http://localhost:3000/adaptive?view=mobile`  | **Fuerza la plantilla móvil de AWD** (ideal para auditar en navegadores de escritorio sin modificar el User-Agent).                                            | AWD Mobile      |
| `http://localhost:3000/adaptive?view=desktop` | **Fuerza la plantilla desktop de AWD**.                                                                                                                        | AWD Desktop     |
| `http://localhost:3000/api/products`          | Endpoint JSON con los 12 componentes de servidor.                                                                                                              | REST API        |

---

## 6. Detalles de Implementación Técnica

### Fase 1: Catálogo de Hardware (12 Componentes)

Los componentes incluyen procesadores AMD EPYC e Intel Xeon, aceleradores GPU NVIDIA H100 y A100, unidades NVMe U.2 Enterprise (Samsung, Solidigm), memoria DDR5 ECC Registered (Micron), controladoras RAID LSI MegaRAID, fuentes redundantes Titanium y refrigeración líquida industrial.

### Fase 2: Implementación RWD (`/responsive`)

1. **Puntos de Ruptura (Breakpoints)**:
   - **Móvil (`< 640px`)**: Cuadrícula de 1 columna.
   - **Tablet (`640px - 1024px`)**: Cuadrícula de 2 columnas.
   - **Desktop (`> 1024px`)**: Cuadrícula de 3 columnas.
2. **Imágenes locales uniformes**:
   ```html
   <img
     class="product-image"
     src="/img/AMD%20EPYC%E2%84%A2%209654%20Genoa.jpg"
     alt="AMD EPYC™ 9654 Genoa"
     loading="lazy"
     width="800"
     height="500"
   />
   ```
   El contenedor `.product-image-container` fija `aspect-ratio: 16 / 10` y la imagen usa `object-fit: cover`, de modo que todas las tarjetas presentan el mismo tamaño y proporción independientemente de las dimensiones del archivo original.
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
   - **Imágenes locales**: Se reutilizan los archivos de `/img` con el mismo recorte uniforme `16:10` que en las demás vistas.
3. **Resultado de Carga HTML**:
   - `responsive.ejs` (RWD): **~67.0 KB** de documento HTML inicial transferido.
   - `mobile.ejs` (AWD Móvil): **~29.6 KB** de documento HTML inicial transferido.
   - **Reducción de tamaño del documento inicial:** **~55.8% de ahorro neto en bytes HTML**.

---
