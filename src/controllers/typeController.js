const { ResponseException, ResponseOk } = require("../utils/apiResponse")
const { type, type_group} = require('../models/index');

const get_all = async (req, res) => {
    try {
        const MyTypes = await type.findAll({include:[type_group]});
        ResponseOk(res, 200, MyTypes)
    } catch (err) {
        console.log(err);
        return ResponseException(res, 500, 'ERROR_EXCEPTION_GET_ALL',err);
    }
}
const get_ubication = async(req,res)=>{
    try{
        const MyUbication = await type.findAll({include:{model:type_group,where:{code:'TPUBI'}}})
        return ResponseOk(res,200,MyUbication);
    }catch(err){
        return ResponseException(res,500,'ERROR_EXCEPTION_UBICATION_GET',err);
    }
}
const get_debtor = async(req,res)=>{
    try{
        const MyDebtors = await type.findAll({include:{model:type_group,where:{code:'TPDEBTOR'}}})
        return ResponseOk(res,200,MyDebtors)
    }catch(err){
        return ResponseException(res,500,'ERROR_GET_DEBTOR',err)
    }
}
const get_sale_organization = async(req,res)=>{
    try{
        const MySaleOrg = await type.findAll({include:{model:type_group,where:{code:'TPSALEORG'}}})
        return ResponseOk(res,200,MySaleOrg)
    }catch(err){
        return ResponseException(res,500,'ERROR_SALE_ORGANIZATION',err)
    }
}
const get_document = async(req,res)=>{
    try{
        const document = await type.findAll({include:[{model:type_group,where:{code:'TPDOC'} }]})
        return ResponseOk(res,200,document);
    }catch(err){
        return ResponseException(res,500,'EXCEPCION_GET_DOCUMENT',err);
    }
}
const get_center = async(req,res)=>{
    try{
        const Mycenters = await type.findAll({include:[{model:type_group,where:{code:'TPCENTERS'} }]})
        return ResponseOk(res,200,Mycenters);
    }catch(err){
        return ResponseException(res,500,'EXCEPTION_GET_CENTER',err)
    }
}
const get_channel = async(req,res)=>{
    try{
        const MyChannels = await type.findAll({include:[{model:type_group,where:{code:'TPCHANNEL'} }]})
        return ResponseOk(res,200,MyChannels);
    }catch(err){
        return ResponseException(res,500,'EXCEPTION_GET_CHANNEL',err)
    }
}
const get_center_charity = async(req,res)=>{
    try{
        const MyCenterCharity = await type.findAll({include:[{model:type_group,where:{code:'TPCENTERCHARITY'}}]})
        return ResponseOk(res,200,MyCenterCharity)
    }catch(err){
        return ResponseException(res,500,'ERROR_CENTER_CHARITY',err);
    }
}
const get_type_contact = async(req,res)=>{
    try{
        const TypeContact = await type.findAll({include:[{model:type_group, where:{code:'TP-G-CONTAC'}}]})
        return ResponseOk(res,200,TypeContact)
    }catch(err){
        return ResponseException(res,500,'ERROR_TYPE_CONTACT',err);
    }
}
module.exports = {
    get_all, get_ubication, get_document, get_debtor, get_sale_organization, get_center, get_channel, get_center_charity,
    get_type_contact
}