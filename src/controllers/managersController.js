const { matchedData } = require("express-validator");
const {managers} = require("../models/index")
const { ResponseException, ResponseOk } = require("../utils/apiResponse")

const get_all = async(req,res)=>{
    try{
        const MyManagers = await managers.findAll();
        ResponseOk(res,200,MyManagers);
    }catch(err){
        console.log(err);
        ResponseException(res,500,'ERROR_GET_ALL_BUSNESS')
    }
}
const create = async(req,res)=>{
    try{
        let body = matchedData(req);
        const MyManagers = await managers.create(body);
        ResponseOk(res,201,MyManagers);
    }catch(err){
        ResponseException(res,500,'ERROR_EXCEPTION_CREATE_BUSINESS')
    }
}
const update = async(req,res)=>{
    try{
        const {id} = req.params;
        let body = matchedData(req);
        await managers.update(body,{where:{id}});
        ResponseOk(res,202,await managers.findByPk(id));
    }catch(err){
        console.log(err);
        ResponseException(res,500,'ERROR_UPDATE_BUSINESS')
    }
}
const changeStatus=async(req,res)=>{
    try{
        const {id} = req.params;
        const MyManagers = await managers.findByPk(id);
        MyManagers.is_active = !MyManagers.is_active;
        MyManagers.save();
        ResponseOk(res,200,await managers.findByPk(id));
    }catch(err){
        ResponseException(res,500,'ERROR-EXCEPTION-CHANGESTATUS');
    }
}
module.exports = {get_all,create,update,changeStatus}