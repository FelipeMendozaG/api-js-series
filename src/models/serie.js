const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');
const Business = require('./busines');

//const Business = sequelize.define(
const Serie = sequelize.define(
    'series',
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: DataTypes.INTEGER
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        business_id: {
            type: DataTypes.INTEGER,
            references:{
                model:Business,
                key:'id'
            }
        },
        is_status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        timestamps: true,
    }
);

Serie.belongsTo(Business,{foreignKey:'business_id'});

module.exports = Serie;