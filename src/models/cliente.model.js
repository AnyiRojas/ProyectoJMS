// src/models/Cliente.model.js
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Cliente extends Model {
    // Método para crear un nuevo cliente
    static async createCliente(cliente) {
        try {
            return await this.create(cliente);
        } catch (error) {
            console.error(`Unable to create cliente: ${error}`);
            throw error;
        }
    }

    // Método para obtener todos los clientes
    static async getClientes() {
        try {
            return await this.findAll();
        } catch (error) {
            console.error(`Unable to find all clientes: ${error}`);
            throw error;
        }
    }

    // Método para obtener un cliente por su ID
    static async getClienteById(idCliente) {
        try {
            return await this.findOne({ where: { idCliente } });
        } catch (error) {
            console.error(`Unable to find cliente by ID: ${error}`);
            throw error;
        }
    }

    // Método para actualizar un cliente
    static async updateCliente(idCliente, updated_cliente) {
        try {
            const cliente = await this.findOne({ where: { idCliente } });
            return cliente.update(updated_cliente);
        } catch (error) {
            console.error(`Unable to update the cliente: ${error}`);
            throw error;
        }
    }

    // Método para eliminar un cliente
    static async deleteCliente(idCliente) {
        try {
            const cliente = await this.findOne({ where: { idCliente } });
            if (cliente) {
                return cliente.destroy();
            }
            throw new Error('Cliente no encontrado');
        } catch (error) {
            console.error(`Unable to delete cliente: ${error}`);
            throw error;
        }
    }
}

// Definición del modelo Cliente en Sequelize
Cliente.init({
    idCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    comprasCliente: {
        type: DataTypes.STRING(100),
        allowNull: true
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
    tableName: 'cliente',
    timestamps: false,
    underscored: false,
});

export { Cliente };
