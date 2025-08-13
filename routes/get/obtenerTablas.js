const db = require('../../config/database')
const express = require('express')
const router = express.Router();

//Mi ruta GET
router.get('/tablas', async(req,res)=>{
    try {
        let [resultadoTablas] = await db.query('SHOW TABLES')
        res.json(resultadoTablas)
        
    } catch (error) {
        console.log("Erro:  ", error)
        
    }

});

module.exports = router;

