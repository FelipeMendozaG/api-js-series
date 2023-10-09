const { ResponseException, ResponseOk } = require("../utils/apiResponse")
const { type, type_group} = require('../models/index');

const get_all = async (req, res) => {
    try {
        const MyTypes = await type.findAll({include:[type_group]});
        ResponseOk(res, 200, MyTypes)
    } catch (err) {
        console.log(err);
        ResponseException(res, 500, 'ERROR_EXCEPTION_GET_ALL');
    }
}
const get_ubication = async(req,res)=>{
    try{
        const MyUbication = await type.findAll({include:{model:type_group,where:{code:'TPUBI'}}})
        ResponseOk(res,200,MyUbication);
    }catch(err){
        ResponseException(res,500,'ERROR_EXCEPTION_UBICATION_GET');
    }
}
const get_document = async(req,res)=>{
    try{
        const document = await type.findAll({include:[{model:type_group,where:{code:'TPDOC'} }]})
        ResponseOk(res,200,document);
        return ;
    }catch(err){
        console.log(err);
        ResponseException(res,500,'EXCEPCION_GET_DOCUMENT');
    }
}

module.exports = { get_all, get_ubication,get_document}