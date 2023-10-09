const {check} = require('express-validator');
const validationResults = require('../utils/handleValidator');
const {trade, license} = require('../models')

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
    check('electronic_series_fe')
        .exists().withMessage('Ingresar serie Electronica FE')
        .notEmpty().withMessage("La serie electronica de la factura no puede estar vacio")
        .custom(async(value,{req})=>{
            const {ruc} = req.body;
            const Serie = await trade.findOne({where:{ruc,electronic_series_fe:value}});
            if(Serie !== null){
                throw new Error('Esta serie de factura electronica esta siendo utilizada');
            }
            return true;
        })
        .isLength({max:4}).withMessage("La serie de la factura no tener mas de 4 caracteres"),
    check('electronic_series_be')
        .exists().withMessage('Ingresar serie Electronica BE')
        .notEmpty().withMessage("La serie electronica de la factura no puede estar vacio")
        .custom(async(value,{req})=>{
            const {ruc} = req.body;
            const Serie = await trade.findOne({where:{ruc,electronic_series_be:value}});
            if(Serie !== null){
                throw new Error('Esta serie de boleta electronica esta siendo utilizada');
            }
            return true;
        })
        .isLength({max:4}).withMessage("La serie de la boleta no tener mas de 4 caracteres"),
    check('electronic_series_ncf')
        .exists().withMessage('Ingresar serie Electronica NC F')
        .notEmpty().withMessage("La serie electronica de la factura no puede estar vacio")
        .custom(async(value,{req})=>{
            const {ruc} = req.body;
            const Serie = await trade.findOne({where:{ruc,electronic_series_ncf:value}});
            if(Serie !== null){
                throw new Error('Esta serie de nota de credito factura esta siendo utilizada');
            }
            return true;
        })
        .isLength({max:4}).withMessage("La serie de la nota de credito factura no tener mas de 4 caracteres"),
    check('electronic_series_ncb')
        .exists().withMessage('Ingresar serie Electronica NC B')
        .notEmpty().withMessage("La serie electronica de la factura no puede estar vacio")
        .custom(async(value,{req})=>{
            const {ruc} = req.body;
            const Serie = await trade.findOne({where:{ruc,electronic_series_ncb:value}});
            if(Serie !== null){
                throw new Error('Esta serie de nota de debito boleta esta siendo utilizada');
            }
            return true;
        })
        .isLength({max:4}).withMessage("La serie de la nota de credito boleta no tener mas de 4 caracteres"),
    check('license')
        .exists().withMessage('La licencia es requerida')
        .notEmpty().withMessage('La licencia no puede estar vacia')
        .custom(async(value,{req})=>{
            const {type_license} = req.body;
            if(!type_license){
                const lisc = await license.findOne({where:{code_license:value,is_manager:type_license}});
                if(lisc !== null){
                    throw new Error('Licencia duplicada');
                }
            }
            return true;
        }),
    check('ubication')
        .exists().withMessage('La ubicacion es requerido')
        .notEmpty().withMessage('La ubicacion no puede estar vacia'),
    (req,res,next)=>{
        return validationResults(req,res,next);
    }
]

module.exports = {validatorCreateTrade}