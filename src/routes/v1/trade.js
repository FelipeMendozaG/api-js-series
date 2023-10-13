const express=require('express');
const routes = express.Router();
const {get_all, create, changeStatus, get_series_for_business, exportExcel,updated, ImportExcel, upload, get_for_license, get_all_logs} = require('../../controllers/tradeController');
const {validatorCreateTrade,validatorUpdateTrade} = require('../../validators/tradeValidator');

routes.get('/',get_all);
routes.post('/',validatorCreateTrade,create);
routes.put('/:id',validatorUpdateTrade,updated);
routes.post('/logs',get_all_logs);
routes.post('/import/excel', upload.single('fileparam'), ImportExcel);
routes.post('/get_for_license',get_for_license)
routes.post('/search/business',get_series_for_business)
routes.post('/status/:id',changeStatus);
routes.post('/export/excel',exportExcel);

module.exports=routes