const express=require('express');
const routes = express.Router();
const {get_all,get_find_ruc,createOrUpdate, deleted} = require('../../controllers/contactBusinessController');
const { ValidatorCreateContact } = require('../../validators/contactBusinessValidator');

routes.get('/',get_all);
routes.post('/',ValidatorCreateContact,createOrUpdate);
routes.post('/ruc',get_find_ruc);
routes.delete('/:id', deleted);

module.exports=routes