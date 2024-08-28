// src/models/empleado.model.js
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class Empleado extends Model {}

// Definición del modelo Empleado en Sequelize
Empleado.init({
    idEmpleado: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    fechaContratacionEmpleado: {
        type: DataTypes.DATE,
        allowNull: false
    },
    puestoEmpleado: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    docum_entoFK: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuarios',
            key: 'docum_ento'
        }
    }
}, {
    sequelize,
    tableName: 'empleado',
    timestamps: false,
    underscored: false,
});

export { Empleado };
