const { matchedData } = require("express-validator");
const { local, busines, type } = require("../models");
const { ResponseException, ResponseOk } = require("../utils/apiResponse");

const get_all=async(req,res)=>{
    try{
        const MyLocals = await local.findAll({include:[busines,type]});
        ResponseOk(res,200,MyLocals);
    }catch(err){
        ResponseException(res,500,'ERROR_GET_ALL_EXCEPTION');
    }
}
const create=async(req,res)=>{
    try{
        const body = matchedData(req);
        const MyLocal = await local.create(body);
        ResponseOk(res,201,MyLocal);
    }catch(err){
        ResponseException(res,500,'EXCEPTION_CREATE_LOCAL')
    }
}
const updated=async(req,res)=>{
    try{
        const body = matchedData(req);
        const {id} = req.params;
        await local.update(body,{where:{id}});
        ResponseOk(res,202,await local.findByPk(id));
    }catch(err){
        ResponseException(res,500,'EXCEPTION_UPDATE_LOCAL')
    }
}

module.exports = {get_all,create,updated};