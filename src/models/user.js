const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');

const User = sequelize.define(
    'users',
    {
        id:{
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            type:DataTypes.INTEGER
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        is_active:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true
        },
        is_admin:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        }
    },
    {
        timestamps:true,
    }
);

module.exports = User;