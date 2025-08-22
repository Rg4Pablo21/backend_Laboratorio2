const db = require('../../config/database')
const express = require('express');
const router = express.Router();


router.get('/tareas', async(req,res)=>{

    try {

        let [todaslasTareas] = await db.query('SELECT * FROM tareas');
        res.json(todaslasTareas);
        
    } catch (error) {
        console.log("Error: " , error);
    }
});

module.exports = router;
