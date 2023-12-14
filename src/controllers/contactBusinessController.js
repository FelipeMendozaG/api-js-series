const { ResponseException, ResponseOk } = require("../utils/apiResponse")
const {contact_business, busines, type} = require('../models');
const { matchedData } = require("express-validator");
const get_all = async(req,res)=>{
    try{
        const ContactBusiness = await contact_business.findAll({include:[busines,type]});
        return ResponseOk(res,200,ContactBusiness);
    }catch(err){
        console.log(err);
        return ResponseException(res,500,err.message);
    }
}
const get_find_ruc = async(req,res)=>{
    try{
        const {ruc} = req.body;
        const {id:business_id} = await busines.findOne({where:{ruc}});
        const ContactBusiness = await contact_business.findAll({where:{business_id},include:[busines,type]});
        return ResponseOk(res,200,ContactBusiness);
    }catch(err){
        return ResponseException(res,500,err.message)
    }
}
const createOrUpdate = async(req,res)=>{
    try{
        const body = matchedData(req);
        console.log(body);
        const objBusiness = await busines.findOne({where:{ruc:body.business_ruc}})
        const {id} = body;
        if(id){
            const objContact = await contact_business.update({...body,business_id:objBusiness.id},{where:{id}})
            return ResponseOk(res,200,objContact)
        }
        const objContact = await contact_business.create({...body,business_id:objBusiness.id})
        return ResponseOk(res,200,objContact)
    }catch(err){
        return ResponseException(res,500,err.message);
    }
}
const deleted = async(req,res)=>{
    try{
        const {id} = req.params;
        const objDeleted = await contact_business.destroy({where:{id}})
        return ResponseOk(res,200,{objDeleted});
    }catch(err){
        return ResponseException(res,200,err.message);
    }
}

module.exports = {get_all,get_find_ruc,createOrUpdate,deleted}