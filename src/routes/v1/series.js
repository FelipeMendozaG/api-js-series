const express=require('express');
const routes = express.Router();
const {get_all} = require('../../controllers/serieController');
const {} = require('../../validators/businessValidator');

routes.get('/',get_all);

module.exports=routes