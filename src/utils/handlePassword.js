const bcryptjs = require('bcryptjs');
/**
 * Ingresar la contraseña String
 * @param {*} passwordvalue 
 */
const Encrypt = async(passwordvalue)=>{
    const hash = await bcryptjs.hash(passwordvalue, 10);
    // TODO : 
    return hash;
}
/**
 * Pasar contraseña sin hashear y contraseña hasheada
 * @param {*} passwordvalue 
 * @param {*} passwordhash 
 */
const Compare = async(passwordvalue,passwordhash)=>{
    return await bcryptjs.compare(passwordvalue,passwordhash);
}
module.exports = { Encrypt, Compare }