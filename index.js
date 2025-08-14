require('dotenv').config();
const express = require('express');
const app = express();

// Middlewares básicos (opcionales)
app.use(express.json());

// Rutas
const tablasRouter = require('./routes/get/obtenerTablas');
app.use('/api', tablasRouter);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${PORT}`);
});
