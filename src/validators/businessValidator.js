const {check} = require('express-validator');
const validationResults = require('../utils/handleValidator');
const {business} = require('../models/index');

const validatorCreateBusiness=[
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