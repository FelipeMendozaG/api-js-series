const { check } = require('express-validator');
const validationResults = require('../utils/handleValidator');
const {user} = require('../models/index')

const validatorCreateUser=[
    check('name')
        .exists().withMessage("El nombre es requerido")
        .isLength({min:4,max:150}).withMessage("El nombre debe tener un minimo de 4 y 150 caracteres")
        .notEmpty().withMessage("El nombre no puede estar vacio"),
    check('email').exists().withMessage("El correo electronico es requerido")
        .isEmail().withMessage("El correo electronico no es valido")
        .notEmpty().withMessage("El correo electronico no puede estar vacio")
        .custom( async(value,{req})=>{
            if(req.params.id){
                return true;
            }
            // BUSCAMOS EN LA BASE DE DATOS SI YA EXISTE ESE NOMBRE
            if( await user.findOne({where:{email:value}}) != null){
                throw new Error('El usuario ya existe en la base de datos');
            }
            return true
        }),
    check('password').exists().withMessage("El password es requerido")
    .isLength({min:10,max:25}).withMessage("La contraseña debe tener un minimo de 10 y maximo de 25 caracteres")
    .notEmpty().withMessage("La contraseña no puede estar vacia"),
    check('username')
        .exists().withMessage('el username es requerido')
        .notEmpty().withMessage("El username no puede estar vacio"),
    check('password')
        .exists().withMessage("La contraseña es requerido")
        .notEmpty().withMessage("La contraseña no puede estar vacia"),
    (req, res, next)=>{
        return validationResults(req,res,next)
    }
]
const ValidatorFormLogin=[
    check('email').exists().withMessage("El correo electronico es requerido")
        .isEmail().withMessage("El correo electronico no es valido")
        .notEmpty().withMessage("El correo electronico no puede estar vacio"),
    check('password')
        .exists().withMessage("La contraseña es requerido")
        .notEmpty().withMessage("La contraseña no puede estar vacia"),
    (req,res,next)=>{
        return validationResults(req,res,next)
    }
]

module.exports = {validatorCreateUser,ValidatorFormLogin}