const { check } = require('express-validator');
const validationResults = require('../utils/handleValidator');
const { trade, license } = require('../models')
const {Op} = require('sequelize');
const validatorCreateTrade = [
    check('business_name')
        .exists().withMessage('Ingresar Razón social')
        .notEmpty().withMessage("La razon social no puede estar vacio"),
    check('ruc')
        .exists().withMessage('Ingresar RUC')
        .notEmpty().withMessage("El ruc no puede estar vacio"),
    check('address')
        .exists().withMessage("Ingresar direccion"),
    check('trade_business')
        .exists().withMessage('Ingresar Negocio')
        .notEmpty().withMessage("El nombre del negocio no puede estar vacio"),
    check("sale_organization")
        .exists().withMessage("El valor de sale_organization debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio")
        .isObject().withMessage("El valor del dato no es correcto"),
    check("channel")
        .exists().withMessage("El valor de channel debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio")
        .isObject().withMessage("El valor del dato no es correcto"),
    check("sector")
        .exists().withMessage("El valor de sector debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio"),
    check("debtor")
        .exists().withMessage("El valor de debtor debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio")
        .isObject().withMessage("El valor del dato no es correcto"),
    check("denomination")
        .exists().withMessage("El valor de denomination debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio"),
    check("center")
        .exists().withMessage("El valor de center debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio")
        .isObject().withMessage("El valor del dato no es correcto"),
    check("center_charity")
        .exists().withMessage("El valor de center_charity debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio")
        .isObject().withMessage("El valor del dato no es correcto"),
    check("anydesk")
        .exists().withMessage("El valor de anydesk debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio"),
    check("attached_code")
        .exists().withMessage("El valor de attached_code debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio"),
    check("type_local")
        .exists().withMessage("El valor de tipo de local")
        .notEmpty().withMessage("El [] no puede estar vacio"),
    check('electronic_series_fe')
        .exists().withMessage('Ingresar serie Electronica FE')
        .notEmpty().withMessage("La serie electronica de la factura no puede estar vacio")
        .custom(async (value, { req }) => {
            const { ruc } = req.body;
            const Serie = await trade.findOne({ where: { ruc, electronic_series_fe: value } });
            if (Serie !== null) {
                throw new Error('Esta serie de factura electronica esta siendo utilizada');
            }
            return true;
        })
        .isLength({ max: 4 }).withMessage("La serie de la factura no tener mas de 4 caracteres"),
    check('electronic_series_be')
        .exists().withMessage('Ingresar serie Electronica BE')
        .notEmpty().withMessage("La serie electronica de la factura no puede estar vacio")
        .custom(async (value, { req }) => {
            const { ruc } = req.body;
            const Serie = await trade.findOne({ where: { ruc, electronic_series_be: value } });
            if (Serie !== null) {
                throw new Error('Esta serie de boleta electronica esta siendo utilizada');
            }
            return true;
        })
        .isLength({ max: 4 }).withMessage("La serie de la boleta no tener mas de 4 caracteres"),
    check('electronic_series_ncf')
        .exists().withMessage('Ingresar serie Electronica NC F')
        .notEmpty().withMessage("La serie electronica de la factura no puede estar vacio")
        .custom(async (value, { req }) => {
            const { ruc } = req.body;
            const Serie = await trade.findOne({ where: { ruc, electronic_series_ncf: value } });
            if (Serie !== null) {
                throw new Error('Esta serie de nota de credito factura esta siendo utilizada');
            }
            return true;
        })
        .isLength({ max: 4 }).withMessage("La serie de la nota de credito factura no tener mas de 4 caracteres"),
    check('electronic_series_ncb')
        .exists().withMessage('Ingresar serie Electronica NC B')
        .notEmpty().withMessage("La serie electronica de la factura no puede estar vacio")
        .custom(async (value, { req }) => {
            const { ruc } = req.body;
            const Serie = await trade.findOne({ where: { ruc, electronic_series_ncb: value } });
            if (Serie !== null) {
                throw new Error('Esta serie de nota de debito boleta esta siendo utilizada');
            }
            return true;
        })
        .isLength({ max: 4 }).withMessage("La serie de la nota de credito boleta no tener mas de 4 caracteres"),
    check('license')
        .exists().withMessage('La licencia es requerida')
        .notEmpty().withMessage('La licencia no puede estar vacia')
        .isObject().withMessage("El valor del dato no es correcto")
        .custom(async (value, { req }) => {
            const { type_license } = req.body;
            if (!type_license) {
                const lisc = await license.findOne({ where: { code_license: ((value.label).split(' '))[0], is_manager: type_license } });
                if (lisc !== null) {
                    throw new Error('Licencia duplicada');
                }
            }
            return true;
        }),
    check('ubication')
        .exists().withMessage('La ubicacion es requerido')
        .notEmpty().withMessage('La ubicacion no puede estar vacia')
        .isObject().withMessage("El valor del dato no es correcto"),
    (req, res, next) => {
        return validationResults(req, res, next);
    }
]

const validatorUpdateTrade = [
    check('business_name')
        .exists().withMessage('Ingresar Razón social')
        .notEmpty().withMessage("La razon social no puede estar vacio"),
    check('ip')
        .isString("Este no es un valor valido"),
    check('host')
        .isString("Este no es un valor valido"),
    check('number_indentifier')
        .isString('Este no es un valor valido'),
    check('ruc')
        .exists().withMessage('Ingresar RUC')
        .notEmpty().withMessage("El ruc no puede estar vacio"),
    check('address')
        .exists().withMessage("Ingresar direccion"),
    check('trade_business')
        .exists().withMessage('Ingresar Negocio')
        .notEmpty().withMessage("El nombre del negocio no puede estar vacio"),
    check("sale_organization")
        .exists().withMessage("El valor de sale_organization debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio")
        .isObject().withMessage("El valor del dato de organizacion es invalido"),
    check("channel")
        .exists().withMessage("El valor de channel debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio")
        .isObject().withMessage("El valor del dato de organizacion es invalido"),
    check("sector")
        .exists().withMessage("El valor de sector debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio"),
    check("debtor")
        .exists().withMessage("El valor de debtor debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio")
        .isObject().withMessage("El valor del dato de organizacion es invalido"),
    check("denomination")
        .exists().withMessage("El valor de denomination debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio"),
    check("center")
        .exists().withMessage("El valor de center debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio")
        .isObject().withMessage("El valor del dato de organizacion es invalido"),
    check("center_charity")
        .exists().withMessage("El valor de center_charity debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio")
        .isObject().withMessage("El valor del dato de organizacion es invalido"),
    check("anydesk")
        .exists().withMessage("El valor de anydesk debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio"),
    check("attached_code")
        .exists().withMessage("El valor de attached_code debe existir")
        .notEmpty().withMessage("El [] no puede estar vacio"),
    check("type_local")
        .exists().withMessage("El valor de tipo de local")
        .notEmpty().withMessage("El [] no puede estar vacio"),
    check('electronic_series_fe')
        .exists().withMessage('Ingresar serie Electronica FE')
        .notEmpty().withMessage("La serie electronica de la factura no puede estar vacio")
        .custom(async (value, { req }) => {
            const { ruc, is_duplicate } = req.body;
            const {id} = req.params;
            if(is_duplicate === false){
                const Serie = await trade.findOne({ where: { ruc, electronic_series_fe: value, id:{[Op.ne]:id}} });
                if (Serie !== null) {
                    throw new Error('Esta serie de factura electronica esta siendo utilizada');
                }
            }
            return true;
        })
        .isLength({ max: 4 }).withMessage("La serie de la factura no tener mas de 4 caracteres"),
    check('electronic_series_be')
        .exists().withMessage('Ingresar serie Electronica BE')
        .notEmpty().withMessage("La serie electronica de la factura no puede estar vacio")
        .custom(async (value, { req }) => {
            const { ruc, is_duplicate } = req.body;
            const {id} = req.params;
            if(is_duplicate === false){
                const Serie = await trade.findOne({ where: { ruc, electronic_series_be: value, id:{[Op.ne]:id}} });
                if (Serie !== null) {
                    throw new Error('Esta serie de boleta electronica esta siendo utilizada');
                }
            }
            return true;
        })
        .isLength({ max: 4 }).withMessage("La serie de la boleta no tener mas de 4 caracteres"),
    check('electronic_series_ncf')
        .exists().withMessage('Ingresar serie Electronica NC F')
        .notEmpty().withMessage("La serie electronica de la factura no puede estar vacio")
        .custom(async (value, { req }) => {
            const { ruc, is_duplicate} = req.body;
            const {id} = req.params;
            if(is_duplicate === false){
                const Serie = await trade.findOne({ where: { ruc, electronic_series_ncf: value, id:{[Op.ne]:id}} });
                if (Serie !== null) {
                    throw new Error('Esta serie de nota de credito factura esta siendo utilizada');
                }
            }
            return true;
        })
        .isLength({ max: 4 }).withMessage("La serie de la nota de credito factura no tener mas de 4 caracteres"),
    check('electronic_series_ncb')
        .exists().withMessage('Ingresar serie Electronica NC B')
        .notEmpty().withMessage("La serie electronica de la factura no puede estar vacio")
        .custom(async (value, { req }) => {
            const { ruc, is_duplicate } = req.body;
            const {id} = req.params;
            if(is_duplicate === false){
                const Serie = await trade.findOne({ where: { ruc, electronic_series_ncb: value, id:{[Op.ne]:id}}});
                if (Serie !== null) {
                    throw new Error('Esta serie de nota de debito boleta esta siendo utilizada');
                }
            }
            return true;
        })
        .isLength({ max: 4 }).withMessage("La serie de la nota de credito boleta no tener mas de 4 caracteres"),
    check('license')
        .exists().withMessage('La licencia es requerida')
        .notEmpty().withMessage('La licencia no puede estar vacia')
        .custom(async (value, { req }) => {
            const { id } = req.params;
            const { type_license } = req.body;
            if (!type_license) {
                const {value:myvalue, label} = value;
                const lisc = await license.findOne({ where: { code_license: (label.split(" "))[0], is_manager: type_license } });
                if (lisc !== null) {
                    throw new Error('Licencia duplicada');
                }
            }
            return true;
        }),
    check('ubication')
        .exists().withMessage('La ubicacion es requerido')
        .notEmpty().withMessage('La ubicacion no puede estar vacia'),
    (req, res, next) => {
        return validationResults(req, res, next);
    }
]

const validatorImportTrade = [
    /* check('fileparam')
        .exists().withMessage('El archivo debe existir.')
        .isBase64().withMessage('El valor debe ser un archivo.'), */
    (req, res, next) => {
        return validationResults(req, res, next);
    }
];

module.exports = { validatorCreateTrade, validatorUpdateTrade, validatorImportTrade }