const express=require('express');
const routes = express.Router();
const {get_all, create, updated} = require('../../controllers/sellPointController');
const {validatorCreateSellPoint} = require('../../validators/sellPointValidator');

routes.get('/',get_all);
routes.post('/',validatorCreateSellPoint,create);
routes.put('/:id',validatorCreateSellPoint,updated)

module.exports=routes