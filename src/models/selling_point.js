
const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');

const Selling_point = sequelize.define(
    'selling_points',
    {
        id:{
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            type:DataTypes.INTEGER
        },
        local_id:{
            type:DataTypes.INTEGER,
            allowNull:true,
        },
        code:{
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

module.exports = Selling_point;
