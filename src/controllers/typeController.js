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

module.exports = { get_all }