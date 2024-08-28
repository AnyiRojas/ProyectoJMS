// Usuario.model.js
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import bcrypt from 'bcrypt';

class Usuario extends Model {
    // Método para crear un nuevo usuario
    static async createUsuario(usuario) {
        try {
            const claveEncriptada = await bcrypt.hash(usuario.contraseña, 10); // Usando un salt de 10
            usuario.contraseña = claveEncriptada;
            return await this.create(usuario);
        } catch (error) {
            console.error(`Unable to create usuario: ${error}`);
            throw error;
        }
    }

    // Método para obtener todos los usuarios
    static async getUsuarios() {
        try {
            return await this.findAll();
        } catch (error) {
            console.error(`Unable to find all usuarios: ${error}`);
            throw error;
        }
    }

    // Método para obtener un usuario por su documento
    static async getUsuarioByDocum(docum_ento) {
        try {
            return await this.findOne({ where: { docum_ento } });
        } catch (error) {
            console.error(`Unable to find usuario by document: ${error}`);
            throw error;
        }
    }

    // Método para actualizar un usuario
    static async updateUsuario(docum_ento, updated_usuario) {
        try {
            const usuario = await this.findOne({ where: { docum_ento } });
            if (updated_usuario.contraseña) {
                updated_usuario.contraseña = await bcrypt.hash(updated_usuario.contraseña, 10);
            }
            return usuario.update(updated_usuario);
        } catch (error) {
            console.error(`Unable to update the usuario: ${error}`);
            throw error;
        }
    }

    // Método para alternar el estado del usuario
    static async toggleUsuarioState(docum_ento) {
        try {
            const usuario = await this.findOne({ where: { docum_ento } });
            const newState = usuario.estado === '1' ? '0' : '1';
            await usuario.update({ estado: newState });
            return usuario;
        } catch (error) {
            console.error(`Unable to toggle usuario state: ${error}`);
            throw error;
        }
    }

    // Método para comparar contraseñas
    async comparar(contrasena) {
        return await bcrypt.compare(contrasena, this.contraseña);
    }
}

// Definición del modelo Usuario en Sequelize
Usuario.init({
    docum_ento: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    NombreCompleto: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING(8),
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    contraseña: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('Cliente', 'Administrador', 'Domiciliario', 'Empleado'),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
    underscored: false,
});

export { Usuario };
