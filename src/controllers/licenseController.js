const { matchedData, body } = require("express-validator");
const { license } = require("../models")
const { ResponseException, ResponseOk } = require("../utils/apiResponse")

const get_all=async(req,res)=>{
    try{
        const License = await license.findAll();
        return ResponseOk(res,200,License);
    }catch(err){
        return ResponseException(res,500,'EXCEPTION_GET_ALL')
    }
}
const create = async(req,res)=>{
    try{
        const body = matchedData(req);
        const objLicense = await license.create(body);
        ResponseOk(res,201,objLicense);
        return ;
    }catch(err){
        console.log(err);
        ResponseException(res,500,'EXCEPTION_CREATE')
        return ;
    }
}
const updated = async(req,res)=>{
    try{
        const {id} = req.params;
        const body = matchedData(req);
        await license.update(body,{where:{id}});
        ResponseOk(res,201,await license.findByPk(id));
        return ;
    }catch(err){
        console.log(err);
        ResponseException(res,500,'EXCEPTION_UDPATED');
        return ;
    }
}
module.exports = {get_all,create,updated}