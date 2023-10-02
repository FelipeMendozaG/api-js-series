const express=require('express');
const routes = express.Router();
const {get_all, create, update, changeStatus, search_ruc} = require('../../controllers/businessController');
const { validatorCreateBusiness, validatorUpdateBusiness } = require('../../validators/businessValidator');

routes.get('/',get_all);
routes.post('/',validatorCreateBusiness,create);
routes.put('/:id',validatorUpdateBusiness,update);
routes.post('/status/:id',changeStatus);
routes.get('/ruc/:ruc',search_ruc)

module.exports=routes