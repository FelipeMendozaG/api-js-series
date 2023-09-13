const {check} = require('express-validator');
const validationResults = require('../utils/handleValidator');
const {serie} = require('../models')

const validatorCreateSerie = [
    check('code')
        .exists().withMessage('Codigo de serie'),
    check('business_id')
        .exists().withMessage('El nombre del negocio'),
    (req,res,next)=>{
        return validationResults(req,res,next);
    }
]

module.exports = {validatorCreateSerie}