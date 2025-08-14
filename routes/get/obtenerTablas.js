const db = require('../../config/database'); 
const express = require('express');
const router = express.Router();
// GET /api/tablas

router.get('/tablas', async (req, res) => {
  try {
    const [resultadoTablas] = await db.query('SHOW TABLES');
    res.json(resultadoTablas);
  } catch (error) {
    console.error('Error en /api/tablas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
