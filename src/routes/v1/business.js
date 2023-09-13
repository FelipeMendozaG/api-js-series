const express=require('express');
const routes = express.Router();
const {get_all, create, update, changeStatus} = require('../../controllers/businessController');
const { validatorCreateBusiness, validatorUpdateBusiness } = require('../../validators/businessValidator');

routes.get('/',get_all);
routes.post('/',validatorCreateBusiness,create);
routes.put('/:id',validatorUpdateBusiness,update);
routes.post('/status/:id',changeStatus);

module.exports=routes