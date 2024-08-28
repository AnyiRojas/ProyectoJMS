// src/controllers/cliente.controller.js
import { QueryTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

class ClienteController {
    // Obtener todos los clientes
    static async getAllClientes(req, res) {
        try {
            const clientes = await sequelize.query('CALL GetAllClientes()', { type: QueryTypes.RAW });
            res.json(clientes[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener clientes', error });
        }
    }

    // Obtener un cliente por su ID
    static async getClienteById(req, res) {
        const { idCliente } = req.params;
        try {
            const result = await sequelize.query('CALL GetClienteById(:idCliente)', {
                replacements: { idCliente },
                type: QueryTypes.RAW
            });
            const cliente = result[0][0];
            if (cliente) {
                res.json(cliente);
            } else {
                res.status(404).json({ message: 'Cliente no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el cliente', error });
        }
    }

    // Crear un nuevo cliente
    static async postCliente(req, res) {
        const { comprasCliente, docum_entoFK } = req.body;
        try {
            await sequelize.query('CALL InsertarCliente(:comprasCliente, :docum_entoFK)', {
                replacements: { comprasCliente, docum_entoFK },
                type: QueryTypes.RAW
            });
            res.status(201).json({ message: 'Cliente creado exitosamente' });
        } catch (error) {
            console.error('Error al crear el cliente:', error);
            res.status(500).json({ message: 'Error al crear el cliente', error });
        }
    }

    // Actualizar un cliente
    static async putCliente(req, res) {
        const idCliente = req.params.idCliente;
        const { comprasCliente, docum_entoFK } = req.body;
        try {
            await sequelize.query('CALL ActualizarCliente(:idCliente, :comprasCliente, :docum_entoFK)', {
                replacements: { idCliente, comprasCliente, docum_entoFK },
                type: QueryTypes.RAW
            });
            res.status(200).json({ message: 'Cliente actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el cliente: ' + error.message });
        }
    }

    // Eliminar un cliente
    static async deleteCliente(req, res) {
        const idCliente = req.params.idCliente;
        try {
            await sequelize.query('CALL EliminarCliente(:idCliente)', {
                replacements: { idCliente },
                type: QueryTypes.RAW
            });
            res.status(200).json({ message: 'Cliente eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el cliente: ' + error.message });
        }
    }
}

export default ClienteController;
