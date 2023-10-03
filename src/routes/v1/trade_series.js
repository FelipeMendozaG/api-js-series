const express=require('express');
const routes = express.Router();
const {get_all, create, changeStatus} = require('../../controllers/trade_seriesController');
const {validatorCreateTrade_series} = require('../../validators/tradeSeriesValidator');

routes.get('/',get_all);
routes.post('/',validatorCreateTrade_series,create);
routes.post('/status/:id',changeStatus);

module.exports=routes