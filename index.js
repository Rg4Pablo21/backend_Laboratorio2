require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * CORS
 * - Permite: localhost (live server / vite), y tu GitHub Pages.
 * - Si defines FRONTEND_URL en .env (p. ej. https://tu-backend.onrender.com o
 *   https://tu-frontend.onrender.com), también se permite.
 */
const allowedOrigins = [
  'http://127.0.0.1:5500',
  'http://localhost:5173',
  'http://localhost:3000',
  'https://rg4pablo21.github.io',
  process.env.FRONTEND_URL // opcional: setéalo en .env si lo usas
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // peticiones sin Origin (curl/Postman) -> permitir
    if (!origin) return cb(null, true);

    // lista explícita
    if (allowedOrigins.includes(origin)) return cb(null, true);

    // comodín para cualquier user/org de GitHub Pages (si lo necesitas)
    const ghPagesPattern = /^https:\/\/[a-z0-9-]+\.github\.io$/i;
    if (ghPagesPattern.test(origin)) return cb(null, true);

    return cb(new Error(`Origen no permitido por CORS: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
}));
// ⚠️ No uses app.options('*') en Express 5

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
