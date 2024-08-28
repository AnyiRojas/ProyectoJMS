// src/controllers/admin.controller.js
import { QueryTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

class AdminController {
    // Obtener todos los admins
    static async getAllAdmins(req, res) {
        try {
            const admins = await sequelize.query('CALL GetAllAdmins()', { type: QueryTypes.RAW });
            res.json(admins[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener admins', error });
        }
    }

    // Obtener un admin por su ID
    static async getAdminById(req, res) {
        const { idAdmin } = req.params;
        try {
            const result = await sequelize.query('CALL GetAdminById(:idAdmin)', {
                replacements: { idAdmin },
                type: QueryTypes.RAW
            });
            const admin = result[0][0];
            if (admin) {
                res.json(admin);
            } else {
                res.status(404).json({ message: 'Admin no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el admin', error });
        }
    }

    // Crear un nuevo admin
    static async postAdmin(req, res) {
        const { docum_entoFK } = req.body;
        try {
            await sequelize.query('CALL InsertarAdmin(:docum_entoFK)', {
                replacements: { docum_entoFK },
                type: QueryTypes.RAW
            });
            res.status(201).json({ message: 'Admin creado exitosamente' });
        } catch (error) {
            console.error('Error al crear el admin:', error);
            res.status(500).json({ message: 'Error al crear el admin', error });
        }
    }

    // Actualizar un admin
    static async putAdmin(req, res) {
        const idAdmin = req.params.idAdmin;
        const { docum_entoFK } = req.body;
        try {
            await sequelize.query('CALL ActualizarAdmin(:idAdmin, :docum_entoFK)', {
                replacements: { idAdmin, docum_entoFK },
                type: QueryTypes.RAW
            });
            res.status(200).json({ message: 'Admin actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el admin: ' + error.message });
        }
    }

    // Eliminar un admin
    static async deleteAdmin(req, res) {
        const idAdmin = req.params.idAdmin;
        try {
            await sequelize.query('CALL EliminarAdmin(:idAdmin)', {
                replacements: { idAdmin },
                type: QueryTypes.RAW
            });
            res.status(200).json({ message: 'Admin eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el admin: ' + error.message });
        }
    }
}

export default AdminController;
