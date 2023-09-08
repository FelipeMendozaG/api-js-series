const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');

const Business = sequelize.define(
    'business',
    {
        id:{
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            type:DataTypes.INTEGER
        },
        ruc:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        address:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        is_active:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue:false
        }
    },
    {
        timestamps:true,
    }
);

module.exports = Business;