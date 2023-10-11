const express=require('express');
const routes = express.Router();
const {get_all,create,updated} = require('../../controllers/licenseController');
const { ValidatorCreateLicense,ValidatorUpdatedLicense} = require('../../validators/licenseValidator');

routes.get('/',get_all);
routes.post('/',ValidatorCreateLicense,create)
routes.put('/:id',ValidatorUpdatedLicense,updated);

module.exports=routes