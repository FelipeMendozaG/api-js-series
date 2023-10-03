const {check} = require('express-validator');
const validationResults = require('../utils/handleValidator');
const {serie} = require('../models')

const validatorCreateManagers = [
    check('type_manager_id')
        .exists().withMessage('Ingresar Area'),
    check('business_id')
        .exists().withMessage('Ingresar Negocio'),
    (req,res,next)=>{
        return validationResults(req,res,next);
    }
]

module.exports = {validatorCreateManagers}