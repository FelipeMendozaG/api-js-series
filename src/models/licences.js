const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');

const License = sequelize.define(
    'licences',
    {
        id:{
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            type:DataTypes.INTEGER
        },
        code_license:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        box_count:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        is_manager:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
    },
    {
        timestamps:true,
    }
);

module.exports = License;