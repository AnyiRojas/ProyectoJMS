// src/controllers/producto.controller.js
import { QueryTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

class ProductoController {
    // Obtener todos los productos
    static async getAllProductos(req, res) {
        try {
            const productos = await sequelize.query('CALL GetAllProductos()', { type: QueryTypes.RAW });
            res.json(productos[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener productos', error });
        }
    }

    // Obtener un producto por ID
    static async getProductoById(req, res) {
        const { idProductos } = req.params;
        try {
            const result = await sequelize.query('CALL GetProductoById(:idProductos)', {
                replacements: { idProductos },
                type: QueryTypes.RAW
            });
            const producto = result[0][0];
            if (producto) {
                res.json(producto);
            } else {
                res.status(404).json({ message: 'Producto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el producto', error });
        }
    }

    // Crear un nuevo producto
    static async postProducto(req, res) {
        const { nombreProducto, descripcionProducto, stockProducto, precioProducto, idEmpleadoFK } = req.body;
        try {
            await sequelize.query('CALL InsertarProducto(:nombreProducto, :descripcionProducto, :stockProducto, :precioProducto, :idEmpleadoFK)', {
                replacements: { nombreProducto, descripcionProducto, stockProducto, precioProducto, idEmpleadoFK },
                type: QueryTypes.RAW
            });
            res.status(201).json({ message: 'Producto creado exitosamente' });
        } catch (error) {
            console.error('Error al crear el producto:', error);
            res.status(500).json({ message: 'Error al crear el producto', error });
        }
    }

    // Actualizar un producto
    static async putProducto(req, res) {
        const idProductos = req.params.idProductos;
        const { nombreProducto, descripcionProducto, stockProducto, precioProducto, idEmpleadoFK } = req.body;
        try {
            await sequelize.query('CALL ActualizarProducto(:idProductos, :nombreProducto, :descripcionProducto, :stockProducto, :precioProducto, :idEmpleadoFK)', {
                replacements: { idProductos, nombreProducto, descripcionProducto, stockProducto, precioProducto, idEmpleadoFK },
                type: QueryTypes.RAW
            });
            res.status(200).json({ message: 'Producto actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el producto: ' + error.message });
        }
    }

    // Eliminar un producto
    static async deleteProducto(req, res) {
        const idProductos = req.params.idProductos;
        try {
            await sequelize.query('CALL EliminarProducto(:idProductos)', {
                replacements: { idProductos },
                type: QueryTypes.RAW
            });
            res.status(200).json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el producto: ' + error.message });
        }
    }
}

export default ProductoController;
