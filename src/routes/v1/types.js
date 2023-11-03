const express=require('express');
const routes = express.Router();
const {get_all,get_ubication, get_document, get_debtor, get_sale_organization, get_center, get_channel, get_center_charity} = require('../../controllers/typeController');

routes.get('/',get_all);
routes.get('/ubication',get_ubication);
routes.get('/documents',get_document);
routes.get('/debtor',get_debtor);
routes.get('/sale_organization',get_sale_organization);
routes.get('/centers',get_center);
routes.get('/center_charity',get_center_charity)
routes.get('/channel',get_channel);

module.exports=routes