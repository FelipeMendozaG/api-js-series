const { check } = require("express-validator")
const validationResults = require("../utils/handleValidator")

const validatorCreateSellPoint=[
    check('local_id')
        .exists().withMessage('El local id es requerido'),
    check('code')
        .exists().withMessage('El codigo es requerido'),
    (req,res,next)=>{
        return validationResults(req,res,next);
    }
]

module.exports = {validatorCreateSellPoint}