const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');

const Managers = sequelize.define(
    'managers',
    {
        id:{
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            type:DataTypes.INTEGER
        },
        type_manager_id:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        business_id:{
            type:DataTypes.STRING,
            allowNull:true
        },
        job:{
            type:DataTypes.STRING,
            allowNull:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        area:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        cell_phone_number:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    {
        timestamps:true,
        tableName:'managers'
    }
);

module.exports = Managers;