import { Router } from 'express';
import UsuarioController from '../controllers/usuario.controller.js';
import RegisterController from '../controllers/register.controller.js';
import LoginController from '../controllers/login.controller.js';

const router = Router();

router.get('/api/usuario', UsuarioController.getAllUsuarios); // Obtener todos los usuarios
router.get('/api/usuario/:docum_ento', UsuarioController.getUsuarioByDocumento); // Obtener un usuario por documento
router.post('/api/usuario', UsuarioController.postUsuario); // Crear un nuevo usuario
router.put('/api/usuario/:docum_ento', UsuarioController.putUsuario); // Actualizar un usuario
router.delete('/api/usuario/:docum_ento', UsuarioController.deleteUsuario); // Eliminar un usuario

router.post('/api/register', RegisterController.register); // Registro
router.post('/api/login', LoginController.login); // Login

export default router;
