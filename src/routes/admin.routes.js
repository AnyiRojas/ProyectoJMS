// src/routes/index.js
import { Router } from 'express';
import AdminController from '../controllers/admin.controller.js';
import RegisterController from '../controllers/register.controller.js';
import LoginController from '../controllers/login.controller.js';

const router = Router();

router.get('/api/admin', AdminController.getAllAdmins); // Obtener todos los admins
router.get('/api/admin/:idAdmin', AdminController.getAdminById); // Obtener un admin por ID
router.post('/api/admin', AdminController.postAdmin); // Crear un nuevo admin
router.put('/api/admin/:idAdmin', AdminController.putAdmin); // Actualizar un admin
router.delete('/api/admin/:idAdmin', AdminController.deleteAdmin); // Eliminar un admin

router.post('/api/register', RegisterController.register); // Registro
router.post('/api/login', LoginController.login); // Login

export default router;
