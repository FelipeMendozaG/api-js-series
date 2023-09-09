const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');

//const Business = sequelize.define(
const TypeGroup = sequelize.define(
    'type_groups',
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
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        is_active:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        }
    },
    {
        timestamps:true,
    }
);

module.exports = TypeGroup;