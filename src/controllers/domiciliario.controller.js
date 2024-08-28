// src/controllers/domiciliario.controller.js
import { QueryTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

class DomiciliarioController {
    // Obtener todos los domiciliarios
    static async getAllDomiciliarios(req, res) {
        try {
            const domiciliarios = await sequelize.query('CALL GetAllDomiciliarios()', { type: QueryTypes.RAW });
            res.json(domiciliarios[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener domiciliarios', error });
        }
    }

    // Obtener un domiciliario por su ID
    static async getDomiciliarioById(req, res) {
        const { idDomiciliario } = req.params;
        try {
            const result = await sequelize.query('CALL GetDomiciliarioById(:idDomiciliario)', {
                replacements: { idDomiciliario },
                type: QueryTypes.RAW
            });
            const domiciliario = result[0][0];
            if (domiciliario) {
                res.json(domiciliario);
            } else {
                res.status(404).json({ message: 'Domiciliario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el domiciliario', error });
        }
    }

    // Crear un nuevo domiciliario
    static async postDomiciliario(req, res) {
        const { vehiculoDomiciliario, fechaContratacionDomiciliario, docum_entoFK } = req.body;
        try {
            await sequelize.query('CALL InsertarDomiciliario(:vehiculoDomiciliario, :fechaContratacionDomiciliario, :docum_entoFK)', {
                replacements: { vehiculoDomiciliario, fechaContratacionDomiciliario, docum_entoFK },
                type: QueryTypes.RAW
            });
            res.status(201).json({ message: 'Domiciliario creado exitosamente' });
        } catch (error) {
            console.error('Error al crear el domiciliario:', error);
            res.status(500).json({ message: 'Error al crear el domiciliario', error });
        }
    }

    // Actualizar un domiciliario
    static async putDomiciliario(req, res) {
        const idDomiciliario = req.params.idDomiciliario;
        const { vehiculoDomiciliario, fechaContratacionDomiciliario, docum_entoFK } = req.body;
        try {
            await sequelize.query('CALL ActualizarDomiciliario(:idDomiciliario, :vehiculoDomiciliario, :fechaContratacionDomiciliario, :docum_entoFK)', {
                replacements: { idDomiciliario, vehiculoDomiciliario, fechaContratacionDomiciliario, docum_entoFK },
                type: QueryTypes.RAW
            });
            res.status(200).json({ message: 'Domiciliario actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el domiciliario: ' + error.message });
        }
    }

    // Eliminar un domiciliario
    static async deleteDomiciliario(req, res) {
        const idDomiciliario = req.params.idDomiciliario;
        try {
            await sequelize.query('CALL EliminarDomiciliario(:idDomiciliario)', {
                replacements: { idDomiciliario },
                type: QueryTypes.RAW
            });
            res.status(200).json({ message: 'Domiciliario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el domiciliario: ' + error.message });
        }
    }
}

export default DomiciliarioController;
