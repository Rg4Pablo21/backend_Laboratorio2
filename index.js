require('dotenv').config();
const express = require('express');


const getTablas = require('./routes/get/obtenerTablas');
app.use(getTablas)





//Configuración de Puerto 
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Servidor: http://localhost:${PORT}`);
})
