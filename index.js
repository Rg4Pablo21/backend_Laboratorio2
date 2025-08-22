require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin:['http://127.0.0.1:5500'],
    methods: ['GET', 'POST', 'OPSTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


const getTablas = require('./routes/get/obtenerTablas');
app.use(getTablas);

const getTareas = require('./routes/get/obtenerTareas')
app.use(getTareas);

//Cors



//Configuracion del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Servidor: http://localhost:${PORT}`);
})
