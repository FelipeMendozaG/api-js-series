const {check} = require('express-validator');
const validationResults = require('../utils/handleValidator');
const {trade_series} = require('../models')

const validatorCreateTrade_series = [
    check('business_name')
        .exists().withMessage('Ingresar Razón social'),
    check('ruc')
        .exists().withMessage('Ingresar RUC'),
    check('trade_business')
        .exists().withMessage('Ingresar Negocio'), 
    check('electronic_series_fe')
        .exists().withMessage('Ingresar serie Electronica FE'), 
    check('electronic_series_be')
        .exists().withMessage('Ingresar serie Electronica BE'), 
    check('electronic_series_ncf')
        .exists().withMessage('Ingresar serie Electronica NC F'), 
    check('electronic_series_ncb')
        .exists().withMessage('Ingresar serie Electronica NC B'),         
    (req,res,next)=>{
        return validationResults(req,res,next);
    }
]

module.exports = {validatorCreateTrade_series}