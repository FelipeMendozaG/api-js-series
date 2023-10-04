const { matchedData } = require("express-validator");
const {trade_series} = require("../models/index");
const { ResponseException, ResponseOk } = require("../utils/apiResponse");

const get_all = async(req,res)=>{
    try{
        const MyTrade_series = await trade_series.findAll();
        ResponseOk(res,200,MyTrade_series);
    }catch(err){
        console.log(err);
        ResponseException(res,500,'ERROR_GET_ALL_BUSNESS')
    }
}
const create = async(req,res)=>{
    try{
        let body = matchedData(req);
        const MyTrade_series = await trade_series.create(body);
        ResponseOk(res,201,MyTrade_series);
    }catch(err){
        ResponseException(res,500,'ERROR_EXCEPTION_CREATE_BUSINESS')
    }
}
const update = async(req,res)=>{
    try{
        const {id} = req.params;
        let body = matchedData(req);
        await trade_series.update(body,{where:{id}});
        ResponseOk(res,202,await trade_series.findByPk(id));
    }catch(err){
        console.log(err);
        ResponseException(res,500,'ERROR_UPDATE_BUSINESS')
    }
}
const changeStatus=async(req,res)=>{
    try{
        const {id} = req.params;
        const MyTrade = await trade_series.findByPk(id);
        MyTrade.is_active = !MyTrade.is_active;
        MyTrade.save();
        ResponseOk(res,200,await trade_series.findByPk(id));
    }catch(err){
        ResponseException(res,500,'ERROR-EXCEPTION-CHANGESTATUS');
    }
}
const get_for_ruc=async(req,res)=>{
    try{
        const {ruc} = req.params;
        const MyTrade_series=await trade_series.findOne({where:{ruc}});
        ResponseOk(res,200, MyTrade_series);
    }catch(err){
        console.log(err);
        ResponseException(res,500,'EXCEPTION_GET_FOR_RUC');
    }
}

module.exports = {get_all,create,update,changeStatus,get_for_ruc}