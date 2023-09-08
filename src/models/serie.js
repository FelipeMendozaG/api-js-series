const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');

//const Business = sequelize.define(
const Serie = sequelize.define(
    'series',
    {
        id:{
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            type:DataTypes.INTEGER
        },
        code:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        business_id:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        is_status:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue:false
        }
    },
    {
        timestamps:true,
    }
);

module.exports = Serie;