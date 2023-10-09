const express=require('express');
const routes = express.Router();
const {get_all,get_ubication, get_document} = require('../../controllers/typeController');

routes.get('/',get_all);
routes.get('/ubication',get_ubication);
routes.get('/documents',get_document)

module.exports=routes