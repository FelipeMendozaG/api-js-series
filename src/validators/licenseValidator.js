const { check } = require("express-validator")
const {Op} = require('sequelize');
const validationResults = require('../utils/handleValidator');
const { license } = require("../models");

const ValidatorCreateLicense=[
    check('code_license')
        .exists().withMessage('EL CODIGO DE LICENCIA ES NECESARIO')
        .notEmpty().withMessage('El CODIGO DE LICENCIA NO PUEDE ESTAR VACIO')
        .custom(async(value)=>{
            const MyLicense = await license.findOne({where:{code_license:value}});
            if(MyLicense !== null){
                throw new Error('EL CODIGO DE LICENCIA YA ESTA USADO');
            }
            return true;
        }),
    check('is_manager')
        .isBoolean().withMessage('EL VALOR DE MANAGER DEBE SER VALIDO'),
    check('box_count')
        .exists().withMessage('EL CONTADOR DE CAJAS'),
    (req,res,next)=>{
        return validationResults(req,res,next);
    }
]
const ValidatorUpdatedLicense=[
    check('code_license')
        .exists().withMessage('EL CODIGO DE LICENCIA ES NECESARIO')
        .notEmpty().withMessage('El CODIGO DE LICENCIA NO PUEDE ESTAR VACIO')
        .custom(async(value,{req})=>{
            const {id} = req.params;
            const MyLicense = await license.findOne({where:{code_license:value,id:{[Op.ne]:id}}});
            if(MyLicense !== null){
                throw new Error('EL CODIGO DE LICENCIA YA ESTA USADO');
            }
            return true;
        }),
    check('is_manager')
        .isBoolean().withMessage('EL VALOR DE MANAGER DEBE SER VALIDO'),
    (req,res,next)=>{
        return validationResults(req,res,next);
    }
]
module.exports = {ValidatorCreateLicense,ValidatorUpdatedLicense}