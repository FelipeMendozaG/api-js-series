const { matchedData } = require("express-validator");
const { selling_point, local } = require("../models");
const { ResponseException, ResponseOk } = require("../utils/apiResponse")

const get_all=async(req,res)=>{
    try{
        const MySellPoint = await selling_point.findAll({include:[local]})
        ResponseOk(res,200,MySellPoint)
    }catch(err){
        ResponseException(res,500,'EXCEPTION_GET_ALL_SELL_POINT');
    }
}
const create=async(req,res)=>{
    try{
        const body = matchedData(req);
        const MySellPoint = await selling_point.create(body);
        ResponseOk(res,201,MySellPoint)
    }catch(err){
        ResponseException(res,500,'EXCEPTION_CREATE_SELL_POINT');
    }
}
const updated=async(req,res)=>{
    try{
        const body = matchedData(req);
        const {id} = req.params;
        await selling_point.update(body,{where:{id}});
        ResponseOk(res,201,await selling_point.findByPk(id));
    }catch(err){
        ResponseException(res,500,'EXCEPTION_UPDATED_SELL_POINT');
    }
}
const deleted=async()=>{

}
module.exports = {get_all,create,updated,deleted}