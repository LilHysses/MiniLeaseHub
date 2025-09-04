const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

// Ruta Home
router.get('/', (req, res) => {
    res.render('home');
})



module.exports = router;