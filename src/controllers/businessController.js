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
        let body = matchedData(req);
        const MyBusiness = await busines.create(body);
        ResponseOk(res,201,MyBusiness);
    }catch(err){
        ResponseException(res,500,'ERROR_EXCEPTION_CREATE_BUSINESS')
    }
}
const update = async(req,res)=>{
    try{
        const {id} = req.params;
        let body = matchedData(req);
        await busines.update(body,{where:{id}});
        ResponseOk(res,202,await busines.findByPk(id));
    }catch(err){
        console.log(err);
        ResponseException(res,500,'ERROR_UPDATE_BUSINESS')
    }
}
const changeStatus=async(req,res)=>{
    try{
        const {id} = req.params;
        const MyBusiness = await busines.findByPk(id);
        MyBusiness.is_active = !MyBusiness.is_active;
        MyBusiness.save();
        ResponseOk(res,200,await busines.findByPk(id));
    }catch(err){
        ResponseException(res,500,'ERROR-EXCEPTION-CHANGESTATUS');
    }
}
module.exports = {get_all,create,update,changeStatus}