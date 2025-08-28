require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS global
const allowedOrigins = [
  'http://127.0.0.1:5500',
  process.env.FRONTEND_URL // ej.: https://tu-frontend.onrender.com
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error(`Origen no permitido por CORS: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ⚠️ Quitar cualquier app.options('*' o '/*') — Express 5 no lo permite

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
});
