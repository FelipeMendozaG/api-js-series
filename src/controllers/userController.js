const { user } = require("../models");
const { ResponseOk, ResponseException, ResponseError } = require("../utils/apiResponse")
const { tokenSign} = require('../utils/handleJWT');
const { Encrypt } = require('../utils/handlePassword');
const { matchedData } = require('express-validator');
const { compare } = require('bcryptjs');
const get_all=async(req,res)=>{
    try{
        const {id} = req.params;
        if(id != undefined){
            ResponseOk(res,200,await user.findByPk(parseInt(id)));
            return ;
        }
        const ModelUser = await user.findAll();
        return ResponseOk(res,200,ModelUser);
    }catch(err){
        return ResponseException(res,500,'ERROR_EXCEPTION_GET_ALL',err);
    }
}
const authenticate=async(req,res)=>{
    try{
        req = matchedData(req);
        const ModelUser = await user.findOne({where:{email:req.email}});
        if(!user){
            ResponseError(res,401,'USER_NOT_EXISTS')
            return ;
        }
        const HashPassword = ModelUser.password;
        const check = await compare(req.password, HashPassword);
        if(!check){
            ResponseError(res,401,'PASSWORD_INVALID')
            return;
        }
        ModelUser.set('password',undefined,{strict:false});
        let myuser = ModelUser.toJSON();
        const data = {
            token : await tokenSign(myuser),
            user:{...myuser,user_id:undefined,is_active:undefined}
        }
        return ResponseOk(res,200,data);
    }catch(err){
        console.log(err);
        return ResponseException(res,500,"ERROR_EXCEPTION",err);
    }
}
const create=async(req,res)=>{
    try{
        let body = matchedData(req);
        body = {...body, password: await Encrypt(body.password)}
        const ModelUser = await user.create(body);
        ModelUser.set('password',undefined,{strict:false});
        const data = {
            token : await tokenSign(ModelUser),
            user : ModelUser,
        }
        return ResponseOk(res,200,data);
    }catch(err){
        console.log(err);
        return ResponseException(res,500,'ERROR_EXCEPTION_CREATE_USER',err);
    }
}
const update=async(req,res)=>{
    try{
        const id = req.params.id
        let body = matchedData(req);
        if(body.password){
            body = {...body,password:await Encrypt(body.password)}
        }
        const ModelUser = await user.update(body, {
            where: { id }
        });
        return ResponseOk(res,200,await user.findByPk(id))
    }catch(err){
        return ResponseException(res,500,'ERROR-EXCEPTION-UPDATED',err)
    }
}
module.exports = {get_all,authenticate,create,update}