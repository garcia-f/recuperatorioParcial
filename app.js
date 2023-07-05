// Imports
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');

const path = require('path');

const app = express();

const { sequelize } = require('./database');

sequelize.authenticate()
    .then(() => console.log('Conexión a base de datos exitosa'))
    .catch((error) => console.log('Error al conectar a base de datos', error));

require('ejs');
app.set('view engine', 'ejs');

require('dotenv').config()
const port = process.env.PORT || 3000

// Middlewares
// TODO: Implementar middlewares
app.use(cors());
//app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(require('./routes/reserva.routes'));

// TODO: Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404
app.use((req, res, next) => {
    res.write(`<div>
        <h1>404 - Ruta no encontrada</h1>
        <hr>
        <p>La pagina que intentas buscar no existe</p>
        <p>Redireccionando a la página de inicio...</p>
        <script>
        (
          () => setTimeout(() => {
            window.location.href='http://localhost:${port}/';
           }, 3000)           
        )();
        </script>
    </h1>`)
});


// Starting the server
app.listen(port, () => console.log(`Server on port ${port}`));