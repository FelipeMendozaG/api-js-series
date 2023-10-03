const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');

const Trade_series = sequelize.define(
    'trade_series',
    {
        id:{
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            type:DataTypes.INTEGER
        },
        ruc:{
            type:DataTypes.STRING,
            allowNull:false
        },
        business_name:{
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
        tableName:'trade_series'
    }
);

module.exports = Trade_series;