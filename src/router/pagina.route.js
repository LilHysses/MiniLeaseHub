const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');



// HOME ROUTE

router.get('/', (req, res) => {
  res.render('home');
});


// REGISTER ROUTES

router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);


module.exports = router;