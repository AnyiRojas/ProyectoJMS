import { Router } from 'express';
import ClienteController from '../controllers/cliente.controller.js';
import RegisterController from '../controllers/register.controller.js';
import LoginController from '../controllers/login.controller.js';

const router = Router();

router.get('/api/cliente', ClienteController.getAllClientes); // Obtener todos los clientes
router.get('/api/cliente/:idCliente', ClienteController.getClienteById); // Obtener un cliente por ID
router.post('/api/cliente', ClienteController.postCliente); // Crear un nuevo cliente
router.put('/api/cliente/:idCliente', ClienteController.putCliente); // Actualizar un cliente
router.delete('/api/cliente/:idCliente', ClienteController.deleteCliente); // Eliminar un cliente

router.post('/api/register', RegisterController.register); // Registro
router.post('/api/login', LoginController.login); // Login

export default router;
