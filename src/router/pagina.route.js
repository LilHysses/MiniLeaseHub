const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const upload = require('../config/multer');



// HOME ROUTE

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', (req, res) => {
  res.render('home');
});

// REGISTER ROUTES

router.get('/register', authController.getRegister);
router.post('/register', upload.single("u_pfp") ,authController.postRegister);

// LOGIN ROUTES

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// LOGOUT ROUTE

router.get('/logout', authController.logout);

module.exports = router;