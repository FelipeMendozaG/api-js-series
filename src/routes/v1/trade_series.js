const express=require('express');
const routes = express.Router();
const {get_all, create, changeStatus, get_for_ruc} = require('../../controllers/tradeSeriesController');
const {validatorCreateTrade_series} = require('../../validators/tradeSeriesValidator');

routes.get('/',get_all);
routes.post('/',validatorCreateTrade_series,create);
routes.post('/status/:id',changeStatus);
routes.get('/valid/:ruc',get_for_ruc);

module.exports=routes