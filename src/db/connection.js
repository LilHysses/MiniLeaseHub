require('dotenv').config();
const mysql = require('mysql2');

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('------------------------------------ Connected to the database MySQL. ------------------------------------');
    }
});

module.exports = connection;