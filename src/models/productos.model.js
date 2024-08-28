// src/models/producto.model.js
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class Producto extends Model {}

// Definición del modelo Producto en Sequelize
Producto.init({
    idProductos: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombreProducto: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    descripcionProducto: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    stockProducto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precioProducto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idEmpleadoFK: {
        type: DataTypes.INTEGER,
        references: {
            model: 'empleado',
            key: 'idEmpleado'
        }
    }
}, {
    sequelize,
    tableName: 'productos',
    timestamps: false,
    underscored: false,
});

export { Producto };
