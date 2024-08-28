// src/models/Admin.model.js
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Admin extends Model {
    // Método para crear un nuevo admin
    static async createAdmin(admin) {
        try {
            return await this.create(admin);
        } catch (error) {
            console.error(`Unable to create admin: ${error}`);
            throw error;
        }
    }

    // Método para obtener todos los admins
    static async getAdmins() {
        try {
            return await this.findAll();
        } catch (error) {
            console.error(`Unable to find all admins: ${error}`);
            throw error;
        }
    }

    // Método para obtener un admin por su ID
    static async getAdminById(idAdmin) {
        try {
            return await this.findOne({ where: { idAdmin } });
        } catch (error) {
            console.error(`Unable to find admin by ID: ${error}`);
            throw error;
        }
    }

    // Método para actualizar un admin
    static async updateAdmin(idAdmin, updated_admin) {
        try {
            const admin = await this.findOne({ where: { idAdmin } });
            return admin.update(updated_admin);
        } catch (error) {
            console.error(`Unable to update the admin: ${error}`);
            throw error;
        }
    }

    // Método para eliminar un admin
    static async deleteAdmin(idAdmin) {
        try {
            const admin = await this.findOne({ where: { idAdmin } });
            if (admin) {
                return admin.destroy();
            }
            throw new Error('Admin no encontrado');
        } catch (error) {
            console.error(`Unable to delete admin: ${error}`);
            throw error;
        }
    }
}

// Definición del modelo Admin en Sequelize
Admin.init({
    idAdmin: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    docum_entoFK: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuarios',
            key: 'docum_ento'
        },
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'admin',
    timestamps: false,
    underscored: false,
});

export { Admin };
