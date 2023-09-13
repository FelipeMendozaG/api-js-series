const { check } = require("express-validator");
const validationResults = require("../utils/handleValidator");

const ValidatorCreateLocal=[
    check('name')
        .exists().withMessage("El nombre del local es requerido"),
    check('business_id')
        .exists().withMessage("El negocio es requerido"),
    check('address')
        .exists().withMessage("La direccion es requerida"),
    check('type_ubication_id')
        .exists().withMessage("El tipo de ubicacion es requerida"),
    check('channel')
        .exists().withMessage("El canal es requerido"),
    check('organization')
        .exists().withMessage("La organizacion es requerida"),
    check('deudor')
        .exists().withMessage("El deudor es requerido"),
    check('denomination')
        .exists().withMessage("El nombre es requerido"),
    check('code')
        .exists().withMessage("El codigo es requerido"),
    (req,res,next)=>{
        return validationResults(req,res,next);
    }
];

module.exports = {ValidatorCreateLocal}