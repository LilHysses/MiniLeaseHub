const express = require('express');
const router = express.Router();
const typesController = require('../controllers/propertyUserControllers');
const authMiddleware = require('../middleware/auth');
const upload = require('../config/multer');

// Solo usuarios autenticados pueden acceder a estas rutas + 
// esta ruta es la de publicacion del inmueble o mirar tusa inmuebles publicados
router.get('/propertyUser', authMiddleware, typesController.getPropertyUser);

// ruta para publicar el inmueble con sus imagenes
router.post('/propertyUser', authMiddleware, upload.fields([
    {name: 'in_p1', maxCount: 1},
    {name: 'in_p2', maxCount: 1},
    {name: 'in_p3', maxCount: 1},
    {name: 'in_p4', maxCount: 1}
]), typesController.postPropertyUser);


module.exports = router;
