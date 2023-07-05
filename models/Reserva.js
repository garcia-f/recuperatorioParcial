// TODO: Crear modelo de datos de Reserva
const { sequelize, DataTypes } = require('../database');

const reserva = sequelize.define('reserva', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_salida: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fecha_llegada: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    codigo: {
        type: DataTypes.STRING,
        defaultValue: new Date().getTime()
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {

    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: 'reservas'
});


reserva.sync();

module.exports = reserva; 