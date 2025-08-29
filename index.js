require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * CORS
 * - Permite: localhost (vite/live server), FRONTEND_URL (si se define en .env),
 *   y tu GitHub Pages: https://rg4pablo21.github.io
 * - Acepta subrutas de GH Pages sin problema.
 */
const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5173',     // si usas Vite
  'http://localhost:3000',     // pruebas locales (fetch desde otra app)
  'https://rg4pablo21.github.io',
  process.env.FRONTEND_URL     // ej.: https://tu-frontend.onrender.com
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // Requests sin Origin (curl/Postman) -> permitir
    if (!origin) return cb(null, true);

    // ¿Está el origin en la lista permitida?
    if (allowedOrigins.includes(origin)) return cb(null, true);

    // Permitir también variantes *.github.io si algún día cambias usuario/org
    const ghPagesPattern = /^https:\/\/[a-z0-9-]+\.github\.io$/i;
    if (ghPagesPattern.test(origin)) return cb(null, true);

    return cb(new Error(`Origen no permitido por CORS: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  // No fijes allowedHeaders: deja que 'cors' refleje los que pida el navegador
  credentials: true
}));
// No uses app.options('*', ...) en Express 5

// Rutas
const getTablas = require('./routes/get/obtenerTablas');
app.use(getTablas);

const getTareas = require('./routes/get/obtenerTareas');
app.use(getTareas);

// Healthcheck
app.get('/', (req, res) => {
  res.json({ ok: true, service: 'backend_laboratorio2' });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${PORT}`);
  console.log('CORS permitiendo:', allowedOrigins);
});
