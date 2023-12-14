const { check } = require('express-validator');
const validationResults = require('../utils/handleValidator');

const ValidatorCreateContact = [
    check('point_of_sale')
        .notEmpty().withMessage('No puede estar vacio')
        .exists().withMessage('La ubicacion es necesaria'),
    check('contact_name')
        .notEmpty().withMessage('No puede estar vacio')
        .exists().withMessage('El nombre de contacto es necesaria'),
    check('email')
        .notEmpty().withMessage('No puede estar vacio')
        .exists().withMessage('El correo electronico es necesario')
        .isEmail().withMessage('Tiene que ser un correo electronico valido'),
    check('tel_phone')
        .notEmpty().withMessage('No puede estar vacio')
        .exists().withMessage('El telefono es necesario')
        .isMobilePhone().withMessage('Tiene que ser un numero de telefono'),
    check('business_ruc')
        .notEmpty().withMessage('No puede estar vacio')
        .exists().withMessage('El identificador del negocio es necesario'),
    check('type_contact')
        .notEmpty().withMessage('No puede estar vacio')
        .exists().withMessage('El cargo del contacto es necesario'),
    check('observations')
        .isString().withMessage('Debe ser alfanumerico'),
    check('id'),
    (req,res,next)=>{
        return validationResults(req,res,next);
    }
]

module.exports = {ValidatorCreateContact}