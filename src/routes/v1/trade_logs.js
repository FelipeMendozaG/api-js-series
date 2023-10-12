const express=require('express');
const routes = express.Router();
const {get_all} = require('../../controllers/tradeLogController');
const {} = require('../../validators/tradeLogValidator');

routes.get('/',get_all);

module.exports=routes