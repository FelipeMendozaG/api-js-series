const {check} = require('express-validator');
const validationResults = require('../utils/handleValidator');
const {serie} = require('../models')

const validatorCreateTrade = [
    check('business_name')
        .exists().withMessage('Ingresar Razón social')
        .notEmpty().withMessage("La razon social no puede estar vacio"),
    check('ruc')
        .exists().withMessage('Ingresar RUC')
        .notEmpty().withMessage("El ruc no puede estar vacio"),
    check('trade_business')
        .exists().withMessage('Ingresar Negocio')
        .notEmpty().withMessage("El nombre del negocio no puede estar vacio"), 
    check('electronic_series_fe')
        .exists().withMessage('Ingresar serie Electronica FE')
        .notEmpty().withMessage("La serie electronica de la factura no puede estar vacio"),
    check('electronic_series_be')
        .exists().withMessage('Ingresar serie Electronica BE')
        .notEmpty().withMessage("La serie electronica de la factura no puede estar vacio"), 
    check('electronic_series_ncf')
        .exists().withMessage('Ingresar serie Electronica NC F')
        .notEmpty().withMessage("La serie electronica de la factura no puede estar vacio"), 
    check('electronic_series_ncb')
        .exists().withMessage('Ingresar serie Electronica NC B')
        .notEmpty().withMessage("La serie electronica de la factura no puede estar vacio"),
    (req,res,next)=>{
        return validationResults(req,res,next);
    }
]

module.exports = {validatorCreateTrade}