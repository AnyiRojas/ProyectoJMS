// src/controllers/usuario.controller.js
import { QueryTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import bcrypt from 'bcrypt';

class UsuarioController {
    // Obtener todos los usuarios
    static async getAllUsuarios(req, res) {
        try {
            const usuarios = await sequelize.query('CALL GetAllUsuarios()', { type: QueryTypes.RAW });
            res.json(usuarios[0]);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuarios', error });
        }
    }

    // Obtener un usuario por su documento
    static async getUsuarioByDocumento(req, res) {
        const { docum_ento } = req.params;
        try {
            const result = await sequelize.query('CALL GetUsuarioByDocumento(:docum_ento)', {
                replacements: { docum_ento },
                type: QueryTypes.RAW
            });
            const usuario = result[0][0];
            if (usuario) {
                res.json(usuario);
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el usuario', error });
        }
    }

    // Crear un nuevo usuario
    static async postUsuario(req, res) {
        const { NombreCompleto, correo, telefono, direccion, estado, usuario, contraseña, rol } = req.body;
        try {
            const claveEncriptada = await bcrypt.hash(contraseña, 10); // Encriptar la contraseña
            await sequelize.query('CALL InsertarUsaurio', {
                replacements: { NombreCompleto, correo, telefono, direccion, estado, usuario, contraseña: claveEncriptada, rol },
                type: QueryTypes.RAW,
            });
            res.status(201).json({ message: 'Usuario creado exitosamente' });
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            res.status(500).json({ message: 'Error al crear el usuario', error });
        }
    }

    // Actualizar un usuario
    static async putUsuario(req, res) {
        const docum_ento = req.params.docum_ento;
        const { NombreCompleto, correo, telefono, direccion, estado, usuario, contraseña,rol } = req.body;
        try {
            const claveEncriptada = contraseña ? await bcrypt.hash(contraseña, 10) : undefined;
            await sequelize.query('CALL ActualizarUsuario(:docum_ento, :NombreCompleto, :correo, :telefono, :direccion, :estado, :usuario, :contraseña), :rol', {
                replacements: { docum_ento, NombreCompleto, correo, telefono, direccion, estado, usuario, contraseña: claveEncriptada, rol },
                type: QueryTypes.RAW
            });
            res.status(200).json({ message: 'Usuario actualizado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el usuario: ' + error.message });
        }
    }


    // Eliminar un usuario
    static async deleteUsuario(req, res) {
        const docum_ento = req.params.docum_ento;
        try {
            await sequelize.query('CALL EliminarUsuario(:docum_ento)', {
                replacements: { docum_ento },
                type: QueryTypes.RAW
            });
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el usuario: ' + error.message });
        }
    }
}

export default UsuarioController;
