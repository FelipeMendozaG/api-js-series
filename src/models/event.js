const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');

const Event = sequelize.define(
    'events',
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
            allowNull:true,
        },
        local_id:{
            type:DataTypes.INTEGER,
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

module.exports = Event