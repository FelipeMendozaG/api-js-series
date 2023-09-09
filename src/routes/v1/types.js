const express=require('express');
const routes = express.Router();
const {get_all} = require('../../controllers/typeController');

routes.get('/',get_all);

module.exports=routes