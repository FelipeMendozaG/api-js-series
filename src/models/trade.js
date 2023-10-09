const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');

const Trade = sequelize.define(
    'trade',
    {
        id:{
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            type:DataTypes.INTEGER
        },
        business_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        ruc:{
            type:DataTypes.STRING,
            allowNull:false
        },
        license:{
            type:DataTypes.STRING,
            allowNull:false
        },
        ubication:{
            type:DataTypes.STRING,
            allowNull:false
        },
        trade_business:{
            type:DataTypes.STRING,
            allowNull:false
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false
        },
        electronic_series_fe:{
            type:DataTypes.STRING,
            allowNull:true
        },
        electronic_series_be:{
            type:DataTypes.STRING,
            allowNull:true
        },
        electronic_series_ncf:{
            type:DataTypes.STRING,
            allowNull:true
        },
        electronic_series_ncb:{
            type:DataTypes.STRING,
            allowNull:true
        }

    },
    {
        timestamps:true,
        tableName:'trade'
    }
);

module.exports = Trade;