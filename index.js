require('dotenv').config();
const express = require('express');
const app = express();

// Middlewares básicos (opcionales)
app.use(express.json());



// Rutas tipo GET 
const tablasRouter = require('./routes/get/obtenerTablas');
app.use('/api', tablasRouter);

const tablasTareas = require('./routes/get/obtenerTareas');
app.use('/api',tablasTareas)

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${PORT}`);
});
