const express=require('express');
const routes = express.Router();
const {get_all,get_ubication} = require('../../controllers/typeController');

routes.get('/',get_all);
routes.get('/ubication',get_ubication);

module.exports=routes