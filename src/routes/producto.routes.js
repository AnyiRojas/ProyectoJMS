import ProductoController from '../controllers/producto.controller.js';

router.get('/api/producto', ProductoController.getAllProductos); // Obtener todos los productos
router.get('/api/producto/:idProductos', ProductoController.getProductoById); // Obtener un producto por ID
router.post('/api/producto', ProductoController.postProducto); // Crear un nuevo producto
router.put('/api/producto/:idProductos', ProductoController.putProducto); // Actualizar un producto
router.delete('/api/producto/:idProductos', ProductoController.deleteProducto); // Eliminar un producto

export default router;
