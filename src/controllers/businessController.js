const { matchedData } = require("express-validator");
const {busines} = require("../models/index")
const { ResponseException, ResponseOk } = require("../utils/apiResponse")

const get_all = async(req,res)=>{
    try{
        const Mybusiness = await busines.findAll();
        ResponseOk(res,200,Mybusiness);
    }catch(err){
        console.log(err);
        ResponseException(res,500,'ERROR_GET_ALL_BUSNESS')
    }
}
const create = async(req,res)=>{
    try{
        let body = matchedData(req.body);
        const MyBusiness = await business.create(body);
        ResponseOk(res,201,MyBusiness);
    }catch(err){
        ResponseException(res,500,'ERROR_EXCEPTION_CREATE_BUSINESS')
    }
}
const update = async()=>{
    try{

    }catch(err){
        ResponseException(res,500,'ERROR_GET_UPDATE_BUSNESS')
    }
}

module.exports = {get_all,create,update}