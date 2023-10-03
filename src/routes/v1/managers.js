const express=require('express');
const routes = express.Router();
const {get_all, create, changeStatus} = require('../../controllers/managersController');
const {validatorCreateManagers} = require('../../validators/managersValidator');

routes.get('/',get_all);
routes.post('/',validatorCreateManagers,create);
routes.post('/status/:id',changeStatus);

module.exports=routes