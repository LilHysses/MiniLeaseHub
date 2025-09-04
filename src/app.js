require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

const routerPagina = require('./router/pagina.route');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de la sesión
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

// Configuración de la vista
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/', routerPagina);

// Iniciar el servidor
const port = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${port}`);
})