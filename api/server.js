require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const growattLogin = require('./config/growatt');
const createRouter = require('./routes');

const app = express();
const port = 3000;

let apiInstance;

app.use(bodyParser.json());

const initializeServer = async () => {
    try {
        // Ejecutar la función de login
        apiInstance = await growattLogin();

        // Pasar apiInstance al enrutador
        app.use('/api', createRouter(apiInstance));
        
        // Iniciar el servidor
        app.listen(port, () => {
            console.log(`Servidor escuchando en el puerto ${port}`);
        });
    } catch (error) {
        console.log('Error durante la inicialización del servidor:', error);
    }
};

initializeServer();

module.exports = { app, apiInstance };
