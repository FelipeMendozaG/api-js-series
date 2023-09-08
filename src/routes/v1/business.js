const express=require('express');
const routes = express.Router();
const {get_all, create, update} = require('../../controllers/businessController');
const { validatorCreateBusiness } = require('../../validators/businessValidator');

routes.get('/',get_all);
routes.post('/',validatorCreateBusiness,create);
routes.put('/:id',validatorCreateBusiness,update)

module.exports=routes