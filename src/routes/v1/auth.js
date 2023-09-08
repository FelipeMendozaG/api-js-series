const express=require('express');
const routes = express.Router();
const {get_all,authenticate} = require('../../controllers/userController');
const {ValidatorFormLogin} = require('../../validators/usersValidator');

routes.get('/',get_all);
routes.post('/authenticate',ValidatorFormLogin,authenticate);

module.exports=routes