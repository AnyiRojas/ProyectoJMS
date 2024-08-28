import DetalleVentaController from '../controllers/detalleVenta.controller.js';



// Rutas para detalles de venta
router.get('/api/detalleventa', DetalleVentaController.getAllDetallesVentas); // Obtener todos los detalles de venta
router.get('/api/detalleventa/:idDetalleVenta', DetalleVentaController.getDetalleVentaById); // Obtener un detalle de venta por ID
router.post('/api/detalleventa', DetalleVentaController.postDetalleVenta); // Crear un nuevo detalle de venta
router.put('/api/detalleventa/:idDetalleVenta', DetalleVentaController.putDetalleVenta); // Actualizar un detalle de venta
router.delete('/api/detalleventa/:idDetalleVenta', DetalleVentaController.deleteDetalleVenta); // Eliminar un detalle de venta

export default router;
