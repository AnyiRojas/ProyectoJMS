// src/models/venta.model.js
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class Venta extends Model {}

// Definición del modelo Venta en Sequelize
Venta.init({
    idVentas: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    fechaVenta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    metodoPagoVenta: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    idClienteFK: {
        type: DataTypes.INTEGER,
        references: {
            model: 'cliente',
            key: 'idCliente'
        }
    },
    idDomiciliarioFK: {
        type: DataTypes.INTEGER,
        references: {
            model: 'domiciliario',
            key: 'idDomiciliario'
        }
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
    tableName: 'ventas',
    timestamps: false,
    underscored: false,
});

export { Venta };
