const express=require('express');
const routes = express.Router();
const {get_all,authenticate, create, update} = require('../../controllers/userController');
const { validatorCreateUser } = require('../../validators/usersValidator');

routes.get('/:id?',get_all);
routes.post('/authenticate',authenticate);
routes.post('/',validatorCreateUser,create);
routes.put('/:id',validatorCreateUser,update);

module.exports=routes