require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

const routerPagina = require('./router/pagina.route');
const routerProperty = require('./router/property.route');


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Configuración de la sesión
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

// Middleware para hacer la sesión accesible en las vistas
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// Configuración de la vista
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/api/v1/', routerPagina);
app.use('/api/v1/properties/', routerProperty);

// Iniciar el servidor
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/api/v1/`);
})