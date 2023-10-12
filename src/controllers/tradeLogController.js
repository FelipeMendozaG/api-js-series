const { trade_logs } = require('../models');
const { ResponseException, ResponseOk } = require('../utils/apiResponse')

const get_all=async(req,res)=>{
    try{
        const tradeLog = await trade_logs.findAll();
        ResponseOk(res,200,tradeLog)
    }catch(err){
        ResponseException(res,500,'EXCEPTION_ERR_GET_ALL');
    }
}

module.exports = {get_all}