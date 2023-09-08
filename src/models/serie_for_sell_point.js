const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');

const Serie_for_sell_point = sequelize.define(
    'serie_for_sell_points',
    {
        id:{
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            type:DataTypes.INTEGER
        },
        type_document_id:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        bussiness_id:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        code:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        sell_point_id:{
            type:DataTypes.INTEGER,
            allowNull:true,
        }
    },
    {
        timestamps:true,
    }
);

module.exports = Serie_for_sell_point;