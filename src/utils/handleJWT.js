const jswebtoken = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;
/**
 * Debes de pasar el objeto del usuario {} : Users
 * @param {*} user 
 */
const tokenSign = async(user)=>{
    const sign = jswebtoken.sign(
        {
            _id:user.user_id,
            email:user.email,
            is_active:user.is_active,
            company:user.company
        },
        JWT_SECRET,
        {
            expiresIn:'3h',
        }
    );
    return sign
}
/**
 * Enviar el token  de session
 * @param {*} tokenJWT 
 * @returns 
 */
const verifyToken = async (tokenJWT)=>{
    try{
        return jswebtoken.verify(tokenJWT,JWT_SECRET);
    }catch(err){
        return null;
    }
}

module.exports = {tokenSign, verifyToken}