const { matchedData } = require("express-validator");
const {trade} = require("../models/index")
const { ResponseException, ResponseOk } = require("../utils/apiResponse")

const get_all = async(req,res)=>{
    try{
        const MyTrade = await trade.findAll();
        ResponseOk(res,200,MyTrade);
    }catch(err){
        console.log(err);
        ResponseException(res,500,'ERROR_GET_ALL_BUSNESS')
    }
}
const create = async(req,res)=>{
    try{
        let body = matchedData(req);
        const MyTrade = await trade.create(body);
        // 
        ResponseOk(res,201,MyTrade);
    }catch(err){
        ResponseException(res,500,'ERROR_EXCEPTION_CREATE_BUSINESS')
    }
}
const update = async(req,res)=>{
    try{
        const {id} = req.params;
        let body = matchedData(req);
        await trade.update(body,{where:{id}});
        ResponseOk(res,202,await trade.findByPk(id));
    }catch(err){
        console.log(err);
        ResponseException(res,500,'ERROR_UPDATE_BUSINESS')
    }
}
const changeStatus=async(req,res)=>{
    try{
        const {id} = req.params;
        const MyTrade = await trade.findByPk(id);
        MyTrade.is_active = !MyTrade.is_active;
        MyTrade.save();
        ResponseOk(res,200,await trade.findByPk(id));
    }catch(err){
        ResponseException(res,500,'ERROR-EXCEPTION-CHANGESTATUS');
    }
}
const get_for_ruc=async(req,res)=>{
    try{
        ResponseOk(res,200,{
            electronic_series_ncb:"F001",
            electronic_series_be:"b001",
            electronic_series_ncf:"c001",
            electronic_series_fe:"F001"
        });
    }catch(err){
        console.log(err);
        ResponseException(res,500,'EXCEPTION_GET_FOR_RUC');
    }
}
module.exports = {get_all,create,update,changeStatus,get_for_ruc}