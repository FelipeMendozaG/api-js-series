const {sequelize} = require('../config/database');
const {DataTypes} = require('sequelize');
const Business = require('./busines');
const Type = require('./type');
const ContactBusiness = sequelize.define(
    'contact_business',
    {
        id:{
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
            type:DataTypes.INTEGER
        },
        point_of_sale:{
            type:DataTypes.STRING,
            allowNull:false
        },
        contact_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        tel_phone:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        business_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:Business,
                key:'id'
            }
        },
        observations:{
            type:DataTypes.TEXT,
            allowNull:true,
        },
        type_contact:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:Type,
                key:'id'
            }
        }
    },
    {
        timestamps:true,
        tableName:'contact_business'
    }
)

ContactBusiness.belongsTo(Business,{foreignKey:'business_id'})
ContactBusiness.belongsTo(Type,{foreignKey:'type_contact'})

module.exports = ContactBusiness;