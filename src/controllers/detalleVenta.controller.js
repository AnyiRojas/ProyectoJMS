// src/controllers/detalleventa.controller.js
import { QueryTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

class DetalleVentaController {
    // Obtener todos los detalles de venta
    static async getAllDetallesVentas(req, res) {
        try {
            const detallesVentas = await sequelize.query('CALL GetAllDetallesVentas()', { type: QueryTypes.RAW });
            res.json(detallesVentas[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener detalles de venta', error });
        }
    }

    // Obtener un detalle de venta por ID
    static async getDetalleVentaById(req, res) {
        const { idDetalleVenta } = req.params;
        try {
            const result = await sequelize.query('CALL GetDetalleVentaById(:idDetalleVenta)', {
                replacements: { idDetalleVenta },
                type: QueryTypes.RAW
            });
            const detalleVenta = result[0][0];
            if (detalleVenta) {
                res.json(detalleVenta);
            } else {
                res.status(404).json({ message: 'Detalle de venta no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el detalle de venta', error });
        }
    }

    // Crear un nuevo detalle de venta
    static async postDetalleVenta(req, res) {
        const { cantidadDetalleVenta, subtotalDetalleVenta, idVentaFK, idProductoFK } = req.body;
        try {
            await sequelize.query('CALL InsertarDetalleVenta(:cantidadDetalleVenta, :subtotalDetalleVenta, :idVentaFK, :idProductoFK)', {
                replacements: { cantidadDetalleVenta, subtotalDetalleVenta, idVentaFK, idProductoFK },
                type: QueryTypes.RAW
            });
            res.status(201).json({ message: 'Detalle de venta creado exitosamente' });
        } catch (error) {
            console.error('Error al crear el detalle de venta:', error);
            res.status(500).json({ message: 'Error al crear el detalle de venta', error });
        }
    }

    // Actualizar un detalle de venta
    static async putDetalleVenta(req, res) {
        const idDetalleVenta = req.params.idDetalleVenta;
        const { cantidadDetalleVenta, subtotalDetalleVenta, idVentaFK, idProductoFK } = req.body;
        try {
            await sequelize.query('CALL ActualizarDetalleVenta(:idDetalleVenta, :cantidadDetalleVenta, :subtotalDetalleVenta, :idVentaFK, :idProductoFK)', {
                replacements: { idDetalleVenta, cantidadDetalleVenta, subtotalDetalleVenta, idVentaFK, idProductoFK },
                type: QueryTypes.RAW
            });
            res.status(200).json({ message: 'Detalle de venta actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el detalle de venta: ' + error.message });
        }
    }

    // Eliminar un detalle de venta
    static async deleteDetalleVenta(req, res) {
        const idDetalleVenta = req.params.idDetalleVenta;
        try {
            await sequelize.query('CALL EliminarDetalleVenta(:idDetalleVenta)', {
                replacements: { idDetalleVenta },
                type: QueryTypes.RAW
            });
            res.status(200).json({ message: 'Detalle de venta eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el detalle de venta: ' + error.message });
        }
    }
}

export default DetalleVentaController;
