const express = require('express');
const fs = require('fs');
const router = express.Router();
const env = require('../config/env');
const PATH_ROUTES = __dirname+'/v1';
const removeExtension = (fileName)=>{
    return fileName.split('.').shift()
}
fs.readdirSync(PATH_ROUTES).filter( (file)=>{
    const name = removeExtension(file)
    if(name!=='index'){
        console.log('cargando ruta '+name);
        router.use(`/${env.versionApi}/${name}`,require(`./${env.versionApi}/${file}`))
    }
});


module.exports = router;