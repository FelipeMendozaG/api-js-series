const { matchedData } = require('express-validator');
const {serie, busines} = require('../models/index');
const { ResponseException, ResponseOk } = require('../utils/apiResponse');
const get_all=async(req,res)=>{
    try{
        const MySeries = await serie.findAll({include:[{model:busines}]});
        ResponseOk(res,200,MySeries);
    }catch(err){
        console.log(err)
        ResponseException(res,500,'ERROR_EXCEPTION_GET_ALL_SERIES');
    }
}
const create=async(req,res)=>{
    try{
        const body = matchedData(req);
        const MySerie =await serie.create(body);
        ResponseOk(res,200,await serie.findByPk(MySerie.id));
    }catch(err){
        ResponseException(res,500,'ERROR_EXCEPTION_CREATE_SERIES');
    }
}
const update=async(req,res)=>{
    
}
const deleted=async(req,res)=>{

}
module.exports ={
    get_all,
    create,
    update,
    deleted
}