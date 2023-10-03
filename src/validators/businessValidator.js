const {check} = require('express-validator');
const validationResults = require('../utils/handleValidator');
const {busines} = require('../models/index');

const validatorCreateBusiness=[
    check('ruc')
        .exists().withMessage('El ruc debe existir')
        .notEmpty().withMessage('El ruc no puede estar vacio')
        .isLength({min:11}).withMessage("El ruc debe tener 11 caracteres")
        .custom(async(value,{req})=>{
            if(await busines.findOne({where:{ruc:value}})){
                throw new Error('Existe un negocio con ese ruc');
            }
            return true;
        }),
    check('name')
        .exists().withMessage('El nombre del negocio')
        .notEmpty().withMessage("El nombre no puede estar vacio"),
    check('address')
        .exists().withMessage('La direccion es requerida')
        .notEmpty().withMessage('La direccion no puede estar vacio'),
    (req,res,next)=>{
        return validationResults(req,res,next);
    }
];
const validatorUpdateBusiness=[
    check('ruc')
        .exists().withMessage('El ruc debe existir'),
    check('name')
        .exists().withMessage('El nombre del negocio'),
    check('address')
        .exists().withMessage('La direccion es requerida'),
    (req,res,next)=>{
        return validationResults(req,res,next);
    }
];

module.exports = {validatorCreateBusiness,validatorUpdateBusiness}