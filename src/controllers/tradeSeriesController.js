const { matchedData } = require("express-validator");
const { trade_series, busines, trade } = require("../models/index");
const { ResponseException, ResponseOk } = require("../utils/apiResponse");
const { SerieNotFound } = require("../utils/handleSeries");
const { Op } = require("sequelize");

const get_all = async (req, res) => {
    try {
        const MyTrade_series = await trade_series.findAll();
        ResponseOk(res, 200, MyTrade_series);
    } catch (err) {
        console.log(err);
        ResponseException(res, 500, 'ERROR_GET_ALL_BUSNESS')
    }
}
const create = async (req, res) => {
    try {
        let body = matchedData(req);
        const MyTrade_series = await trade_series.create(body);
        ResponseOk(res, 201, MyTrade_series);
    } catch (err) {
        ResponseException(res, 500, 'ERROR_EXCEPTION_CREATE_BUSINESS')
    }
}
const update = async (req, res) => {
    try {
        const { id } = req.params;
        let body = matchedData(req);
        await trade_series.update(body, { where: { id } });
        ResponseOk(res, 202, await trade_series.findByPk(id));
    } catch (err) {
        console.log(err);
        ResponseException(res, 500, 'ERROR_UPDATE_BUSINESS')
    }
}
const changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const MyTrade = await trade_series.findByPk(id);
        MyTrade.is_active = !MyTrade.is_active;
        MyTrade.save();
        ResponseOk(res, 200, await trade_series.findByPk(id));
    } catch (err) {
        ResponseException(res, 500, 'ERROR-EXCEPTION-CHANGESTATUS');
    }
}
const get_for_ruc = async (req, res) => {
    try {
        const { ruc } = req.params;
        const MyTrade_series = await trade_series.findOne({ where: { ruc } });
        const MyBusiness = await busines.findOne({ where: { ruc } });
        // CREAMOS UNA FUNCION PARA OBTENER LAS SERIES LIBRES POR SI LAS MOSCAS
        const list_serie_fe = await trade.findAll({
            attributes: ['electronic_series_fe'], where: {
                ruc, electronic_series_fe: {
                    [Op.not]: null
                }
            }, group: ['electronic_series_fe']
        });
        
        const list_serie_be = await trade.findAll({
            attributes: ['electronic_series_be'],
            where: {
                ruc,
                electronic_series_be: {
                    [Op.not]: null
                }
            }, group: ['electronic_series_be']
        });

        const list_serie_ncb = await trade.findAll({
            attributes: ['electronic_series_ncb'],
            where: {
                ruc,
                electronic_series_ncb: {
                    [Op.not]: null,
                    [Op.like]: 'BC%'
                }
            },
            group: ['electronic_series_ncb']
        });

        const list_serie_ncf = await trade.findAll({
            attributes: ['electronic_series_ncf'],
            where: {
                ruc,
                electronic_series_ncf: {
                    [Op.not]: null,
                    [Op.like]: 'FC%'
                }
            },
            group: ['electronic_series_ncf']
        });
        
        const electronic_series_fe_free = SerieNotFound(list_serie_fe.map(item => item.electronic_series_fe));
        const electronic_series_be_free = SerieNotFound(list_serie_be.map(item => item.electronic_series_be),'B')
        const electronic_series_ncb_free = SerieNotFound(list_serie_ncb.map(item => item.electronic_series_ncb), 'BC')
        const electronic_series_ncf_free = SerieNotFound(list_serie_ncf.map(item=> item.electronic_series_ncf),'FC')

        return ResponseOk(res, 200, { ...MyTrade_series.toJSON(), ...MyBusiness.toJSON(), series_free: { electronic_series_fe: electronic_series_fe_free, electronic_series_be: electronic_series_be_free, electronic_series_ncb: electronic_series_ncb_free, electronic_series_ncf:electronic_series_ncf_free} });
    } catch (err) {
        console.log(err);
        return ResponseException(res, 500, 'EXCEPTION_GET_FOR_RUC');
    }
}

module.exports = { get_all, create, update, changeStatus, get_for_ruc }