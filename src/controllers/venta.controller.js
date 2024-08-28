// src/controllers/venta.controller.js
import { QueryTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

class VentaController {
    // Obtener todas las ventas
    static async getAllVentas(req, res) {
        try {
            const ventas = await sequelize.query('CALL GetAllVentas()', { type: QueryTypes.RAW });
            res.json(ventas[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener ventas', error });
        }
    }

    // Obtener una venta por ID
    static async getVentaById(req, res) {
        const { idVentas } = req.params;
        try {
            const result = await sequelize.query('CALL GetVentaById(:idVentas)', {
                replacements: { idVentas },
                type: QueryTypes.RAW
            });
            const venta = result[0][0];
            if (venta) {
                res.json(venta);
            } else {
                res.status(404).json({ message: 'Venta no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la venta', error });
        }
    }

    // Crear una nueva venta
    static async postVenta(req, res) {
        const { fechaVenta, metodoPagoVenta, idClienteFK, idDomiciliarioFK, idEmpleadoFK } = req.body;
        try {
            await sequelize.query('CALL InsertarVenta(:fechaVenta, :metodoPagoVenta, :idClienteFK, :idDomiciliarioFK, :idEmpleadoFK)', {
                replacements: { fechaVenta, metodoPagoVenta, idClienteFK, idDomiciliarioFK, idEmpleadoFK },
                type: QueryTypes.RAW
            });
            res.status(201).json({ message: 'Venta creada exitosamente' });
        } catch (error) {
            console.error('Error al crear la venta:', error);
            res.status(500).json({ message: 'Error al crear la venta', error });
        }
    }

    // Actualizar una venta
    static async putVenta(req, res) {
        const idVentas = req.params.idVentas;
        const { fechaVenta, metodoPagoVenta, idClienteFK, idDomiciliarioFK, idEmpleadoFK } = req.body;
        try {
            await sequelize.query('CALL ActualizarVenta(:idVentas, :fechaVenta, :metodoPagoVenta, :idClienteFK, :idDomiciliarioFK, :idEmpleadoFK)', {
                replacements: { idVentas, fechaVenta, metodoPagoVenta, idClienteFK, idDomiciliarioFK, idEmpleadoFK },
                type: QueryTypes.RAW
            });
            res.status(200).json({ message: 'Venta actualizada correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar la venta: ' + error.message });
        }
    }

    // Eliminar una venta
    static async deleteVenta(req, res) {
        const idVentas = req.params.idVentas;
        try {
            await sequelize.query('CALL EliminarVenta(:idVentas)', {
                replacements: { idVentas },
                type: QueryTypes.RAW
            });
            res.status(200).json({ message: 'Venta eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar la venta: ' + error.message });
        }
    }
}

export default VentaController;
