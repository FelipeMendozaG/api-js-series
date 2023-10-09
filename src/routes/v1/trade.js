const express=require('express');
const routes = express.Router();
const {get_all, create, changeStatus, get_series_for_business} = require('../../controllers/tradeController');
const {validatorCreateTrade} = require('../../validators/tradeValidator');

routes.get('/',get_all);
routes.post('/',validatorCreateTrade,create);
routes.post('/search/business',get_series_for_business)
routes.post('/status/:id',changeStatus);


module.exports=routes