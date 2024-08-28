// src/models/Domiciliario.model.js
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Domiciliario extends Model {
    // Método para crear un nuevo domiciliario
    static async createDomiciliario(domiciliario) {
        try {
            return await this.create(domiciliario);
        } catch (error) {
            console.error(`Unable to create domiciliario: ${error}`);
            throw error;
        }
    }

    // Método para obtener todos los domiciliarios
    static async getDomiciliarios() {
        try {
            return await this.findAll();
        } catch (error) {
            console.error(`Unable to find all domiciliarios: ${error}`);
            throw error;
        }
    }

    // Método para obtener un domiciliario por su ID
    static async getDomiciliarioById(idDomiciliario) {
        try {
            return await this.findOne({ where: { idDomiciliario } });
        } catch (error) {
            console.error(`Unable to find domiciliario by ID: ${error}`);
            throw error;
        }
    }

    // Método para actualizar un domiciliario
    static async updateDomiciliario(idDomiciliario, updated_domiciliario) {
        try {
            const domiciliario = await this.findOne({ where: { idDomiciliario } });
            return domiciliario.update(updated_domiciliario);
        } catch (error) {
            console.error(`Unable to update the domiciliario: ${error}`);
            throw error;
        }
    }

    // Método para eliminar un domiciliario
    static async deleteDomiciliario(idDomiciliario) {
        try {
            const domiciliario = await this.findOne({ where: { idDomiciliario } });
            if (domiciliario) {
                return domiciliario.destroy();
            }
            throw new Error('Domiciliario no encontrado');
        } catch (error) {
            console.error(`Unable to delete domiciliario: ${error}`);
            throw error;
        }
    }
}

// Definición del modelo Domiciliario en Sequelize
Domiciliario.init({
    idDomiciliario: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    vehiculoDomiciliario: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    fechaContratacionDomiciliario: {
        type: DataTypes.DATE,
        allowNull: false
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
    tableName: 'domiciliario',
    timestamps: false,
    underscored: false,
});

export { Domiciliario };
