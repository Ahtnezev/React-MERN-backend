const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// console.log(process.env);
// Crear el servidor de express
const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// Directorio publico
app.use(express.static('public'));
//* use() -> es un middleware ->  ejecuta cada que pasa por cierto lugar

// Lectura y parseo del body
app.use(express.json());


// Rutas
app.use('/api/auth', require('./routes/auth')); //! todo lo que exporta el archivo lo podremos usar en esta ruta
//~ CRUD: Eventos
app.use('/api/events', require('./routes/events'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});