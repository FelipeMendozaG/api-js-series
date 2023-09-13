const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');
const Business = require('./busines');
const Type = require('./type');

const Local = sequelize.define(
    'locals',
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
        business_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        address:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        type_ubication_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        channel:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        organization:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        deudor:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        denomination:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        code:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        is_active:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
    },
    {
        timestamps:true,
    }
);

Local.belongsTo(Business,{foreignKey:'business_id'});
Local.belongsTo(Type,{foreignKey:'type_ubication_id'});

module.exports = Local;