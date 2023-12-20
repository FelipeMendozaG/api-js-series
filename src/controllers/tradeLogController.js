const { trade_logs } = require('../models');
const { ResponseException, ResponseOk } = require('../utils/apiResponse')

const get_all=async(req,res)=>{
    try{
        const tradeLog = await trade_logs.findAll();
        return ResponseOk(res,200,tradeLog)
    }catch(err){
        return ResponseException(res,500,'EXCEPTION_ERR_GET_ALL',err);
    }
}

module.exports = {get_all}