const {server_message,server_status} = require('../config/messages');
const FormatResponse=(status,message,data)=>{
    return {
        status,
        message,data
    }
}

const ResponseOk=(res,code=200,data=null)=>{
    res.status(code);
    const MyResponse = FormatResponse(server_status.ok,server_message.ok,data?data:[]);
    res.send(MyResponse);
}

const ResponseError=(res,code=200,data=null)=>{
    res.status(code);
    const MyResponse = FormatResponse(server_status.error,server_message.error,data?data:[]);
    res.send(MyResponse);
}

const ResponseException=(res,code=200,codeException="ERROR_EXCEPTION")=>{
    res.status(code);
    const MyResponse = FormatResponse(server_status.ok,server_message.ok,codeException);
    res.send(MyResponse);
}

module.exports = {ResponseOk, ResponseError, ResponseException}