// src/models/detalleventa.model.js
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class DetalleVenta extends Model {}

// Definición del modelo DetalleVenta en Sequelize
DetalleVenta.init({
    idDetalleVenta: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    cantidadDetalleVenta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subtotalDetalleVenta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idVentaFK: {
        type: DataTypes.INTEGER,
        references: {
            model: 'ventas',
            key: 'idVentas'
        }
    },
    idProductoFK: {
        type: DataTypes.INTEGER,
        references: {
            model: 'productos',
            key: 'idProductos'
        }
    }
}, {
    sequelize,
    tableName: 'detalleventa',
    timestamps: false,
    underscored: false,
});

export { DetalleVenta };
