const db = require('../../config/database')
const express = require('express')
const router = express.Router();

// Mi ruta get
router.get('/tablas', async(req,res)=>{});
router.post('/agregarTarea', async(req,res)=>{

    try {
        
        let [resultadoTablas] = await db.query('SHOW TABLES');
        res.json(resultadoTablas);

    } catch (error) {
        console.log("Error: ", error)
    }
});

module.exports = router;