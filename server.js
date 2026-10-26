const express = require('express');
const useragent = require('express-useragent');
const path = require('path');
const products = require('./data/products');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para servir recursos estáticos
app.use(express.static(path.join(__dirname, 'public')));
// Imágenes locales del catálogo (carpeta /img en la raíz del proyecto)
app.use('/img', express.static(path.join(__dirname, 'img')));

// Middleware de detección de cliente HTTP (User-Agent)
app.use(useragent.express());

/**
 * Middleware para registrar peticiones y cabeceras de cliente
 */
app.use((req, res, next) => {
  res.setHeader('X-Render-Engine', 'Express-EJS');
  next();
});

/**
 * Ruta Raíz: Portal de Inicio y Resumen de Arquitectura
 */
app.get('/', (req, res) => {
  const ua = req.useragent;
  res.render('index', {
    pageTitle: 'Práctica de Laboratorio: RWD vs. AWD',
    ua,
    productsCount: products.length
  });
});

/**
 * Fase 2: Implementación Versión A (RWD - Responsive Web Design)
 * - Un único archivo HTML consumido por cualquier cliente.
 * - CSS Grid & Flexbox con media queries fluidas (<640px, 640px-1024px, >1024px).
 * - Imágenes locales con relación de aspecto uniforme 16:10.
 * - Incluye todo el contenido en el DOM (gráfico pesado Chart.js y tabla técnica completa).
 */
app.get('/responsive', (req, res) => {
  res.render('responsive', {
    pageTitle: 'Versión RWD (Responsive Web Design) - Catálogo de Servidores',
    products,
    architecture: 'RWD (Responsive Web Design)',
    deviceDetected: req.useragent.isMobile ? 'Móvil' : (req.useragent.isTablet ? 'Tablet' : 'Desktop')
  });
});

/**
 * Fase 3: Implementación Versión B (AWD - Adaptive Web Design)
 * - Servidor Node.js/Express con renderizado condicional.
 * - Inspección de cabeceras HTTP (User-Agent o parámetro explícito ?view=mobile|desktop).
 * - Dos plantillas independientes:
 *    * desktop.ejs: Incluye gráfico comparativo Chart.js y tabla de especificaciones completa.
 *    * mobile.ejs: Excluye deliberadamente el gráfico pesado y la tabla exhaustiva del DOM inicial.
 */
app.get('/adaptive', (req, res) => {
  // Detección mediante query param (útil para auditorías o pruebas) o User-Agent real
  let isMobile = false;
  
  if (req.query.view === 'mobile') {
    isMobile = true;
  } else if (req.query.view === 'desktop') {
    isMobile = false;
  } else {
    // Detección automática basada en express-useragent
    isMobile = Boolean(req.useragent.isMobile || req.useragent.isiPhone || req.useragent.isAndroidPhone);
  }

  // Establecer cabecera Vary para advertir a proxies y CDNs de la bifurcación de contenido
  res.setHeader('Vary', 'User-Agent');

  if (isMobile) {
    // Entrega de plantilla optimizada para terminales móviles (DOM ligero, sin scripts pesados)
    return res.render('mobile', {
      pageTitle: 'Versión AWD (Adaptativo - Móvil) - Catálogo de Servidores',
      products,
      architecture: 'AWD (Adaptive Mobile View)',
      deviceType: 'mobile',
      clientInfo: {
        browser: req.useragent.browser,
        version: req.useragent.version,
        os: req.useragent.os,
        platform: req.useragent.platform
      }
    });
  } else {
    // Entrega de plantilla completa para desktop y estaciones de trabajo
    return res.render('desktop', {
      pageTitle: 'Versión AWD (Adaptativo - Desktop) - Catálogo de Servidores',
      products,
      architecture: 'AWD (Adaptive Desktop View)',
      deviceType: 'desktop',
      clientInfo: {
        browser: req.useragent.browser,
        version: req.useragent.version,
        os: req.useragent.os,
        platform: req.useragent.platform
      }
    });
  }
});

/**
 * Endpoint API para consultar datos en JSON
 */
app.get('/api/products', (req, res) => {
  res.json({
    total: products.length,
    data: products
  });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` Servidor de Práctica RWD vs. AWD en ejecución`);
  console.log(` Puerto: http://localhost:${PORT}`);
  console.log(` - Portada / Comparativa:  http://localhost:${PORT}/`);
  console.log(` - Versión RWD (Unificada): http://localhost:${PORT}/responsive`);
  console.log(` - Versión AWD (Adaptativa): http://localhost:${PORT}/adaptive`);
  console.log(`   (Móvil forzado):        http://localhost:${PORT}/adaptive?view=mobile`);
  console.log(`   (Desktop forzado):      http://localhost:${PORT}/adaptive?view=desktop`);
  console.log(`======================================================\n`);
});
