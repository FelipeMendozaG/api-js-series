const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');
const TypeGroup = require('../models/type_group')
//const Business = sequelize.define(
const Type = sequelize.define(
    'types',
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
        type_group_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: TypeGroup,
                key: 'id',
            }
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
Type.hasOne(TypeGroup,{foreignKey:'id'});
module.exports = Type;