const express=require('express');
const routes = express.Router();
const {get_all, create} = require('../../controllers/serieController');
const {validatorCreateSerie} = require('../../validators/seriesValidator');

routes.get('/',get_all);
routes.post('/',validatorCreateSerie,create);

module.exports=routes