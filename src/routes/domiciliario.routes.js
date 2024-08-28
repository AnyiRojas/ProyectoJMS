// src/routes/index.js
import { Router } from 'express';
import DomiciliarioController from '../controllers/domiciliario.controller.js';
import RegisterController from '../controllers/register.controller.js';
import LoginController from '../controllers/login.controller.js';

const router = Router();

router.get('/api/domiciliario', DomiciliarioController.getAllDomiciliarios); // Obtener todos los domiciliarios
router.get('/api/domiciliario/:idDomiciliario', DomiciliarioController.getDomiciliarioById); // Obtener un domiciliario por ID
router.post('/api/domiciliario', DomiciliarioController.postDomiciliario); // Crear un nuevo domiciliario
router.put('/api/domiciliario/:idDomiciliario', DomiciliarioController.putDomiciliario); // Actualizar un domiciliario
router.delete('/api/domiciliario/:idDomiciliario', DomiciliarioController.deleteDomiciliario); // Eliminar un domiciliario

router.post('/api/register', RegisterController.register); // Registro
router.post('/api/login', LoginController.login); // Login

export default router;
