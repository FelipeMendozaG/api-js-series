const express=require('express');
const routes = express.Router();
const {get_all, create, updated} = require('../../controllers/LocalController');
const { ValidatorCreateLocal } = require('../../validators/localsValidator');

routes.get('/',get_all);
routes.post('/',ValidatorCreateLocal,create);
routes.put('/:id',ValidatorCreateLocal,updated);

module.exports=routes