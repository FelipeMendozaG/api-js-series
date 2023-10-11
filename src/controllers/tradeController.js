const { matchedData } = require("express-validator");
const { trade, trade_series, license } = require("../models/index")
const { ResponseException, ResponseOk } = require("../utils/apiResponse");
const { SerieCorrelative } = require("../utils/handleSeries")
const ExcelJS = require('exceljs');

const get_all = async (req, res) => {
    try {
        const { query } = req;
        if (Object.keys(query).length > 0) {
            const MyTrade = await trade.findAll({ where: { ruc: query.param } });
            ResponseOk(res, 200, MyTrade);
            return;
        }
        const MyTrade = await trade.findAll();
        ResponseOk(res, 200, MyTrade);
        return;
    } catch (err) {
        console.log(err);
        ResponseException(res, 500, 'ERROR_GET_ALL_BUSNESS')
    }
}

const create = async (req, res) => {
    try {
        const { type_license } = req.body;
        let body = matchedData(req);
        const MyTrade = await trade.create(body);
        //
        const { ruc, business_name, license: mylicence } = body;
        const tradeObj = {
            electronic_series_fe: SerieCorrelative(body.electronic_series_fe),
            electronic_series_be: SerieCorrelative(body.electronic_series_be),
            electronic_series_ncf: SerieCorrelative(body.electronic_series_ncf),
            electronic_series_ncb: SerieCorrelative(body.electronic_series_ncb)
        }
        // GUARDAMOS O ACTUALIZAMOS LA LICENCIA
        const Lic = await license.findOne({ where: { code_license: mylicence } });
        if (Lic === null) {
            await license.create({ code_license: mylicence, is_manager: type_license, box_count: 1 });
        }/* else{
            const MyTrade = await trade.findAll({ where: { license: mylicence } });
            await license.update({ box_count: MyTrade.length }, { where: { code_license: mylicence } })
        } */
        if (type_license) {
            const MyTrade = await trade.findAll({ where: { license: mylicence } });
            await license.update({ box_count: MyTrade.length, is_manager: type_license }, { where: { code_license: mylicence } })
        }
        //
        const TradeSeries = await trade_series.findOne({ where: { ruc } });
        if (TradeSeries == null || TradeSeries == undefined) {
            await trade_series.create({ ...tradeObj, ruc, business_name });
            ResponseOk(res, 201, MyTrade);
            return;
        }
        //
        await trade_series.update({ ...tradeObj, business_name }, { where: { ruc } });
        ResponseOk(res, 201, MyTrade);
        return;
    } catch (err) {
        console.log(err);
        ResponseException(res, 500, 'ERROR_EXCEPTION_CREATE_BUSINESS')
    }
}

const updated = async (req, res) => {
    try {
        const { id } = req.params;
        let body = matchedData(req);
        await trade.update(body, { where: { id } });
        ResponseOk(res, 202, await trade.findByPk(id));
    } catch (err) {
        console.log(err);
        ResponseException(res, 500, 'ERROR_UPDATE_BUSINESS')
    }
}
const changeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const MyTrade = await trade.findByPk(id);
        MyTrade.is_active = !MyTrade.is_active;
        MyTrade.save();
        ResponseOk(res, 200, await trade.findByPk(id));
    } catch (err) {
        ResponseException(res, 500, 'ERROR-EXCEPTION-CHANGESTATUS');
    }
}
const get_for_ruc = async (req, res) => {
    try {
        ResponseOk(res, 200, {
            electronic_series_ncb: "F001",
            electronic_series_be: "b001",
            electronic_series_ncf: "c001",
            electronic_series_fe: "F001"
        });
    } catch (err) {
        console.log(err);
        ResponseException(res, 500, 'EXCEPTION_GET_FOR_RUC');
    }
}

const atribute = (param) => {
    const objAtt = {
        factura: 'electronic_series_fe',
        boleta: 'electronic_series_be',
        'Nota de credito': 'electronic_series_ncf',
        'Nota de debito': 'electronic_series_ncb'
    }
    return objAtt[param] || null;
}

const get_series_for_business = async (req, res) => {
    try {
        const { ruc, col } = req.body;
        let attributes = ['ruc', 'trade_business', 'business_name', 'id', 'address', 'ubication', 'license']
        if (col !== undefined) {
            attributes.push(atribute(col));
            const SeriesBusiness = await trade.findAll({ where: { ruc }, attributes })
            ResponseOk(res, 200, SeriesBusiness);
            return;
        }
        ResponseOk(res, 200, await trade.findAll({ where: { ruc } }));
        return;
    } catch (err) {
        console.log(err);
        ResponseException(res, 500, 'EXCEPTION_GET_SERIES');
    }
};

const exportExcel = async (req, res) => {
    try {
        const workbook = new ExcelJS.Workbook();
        const nameSheet = 'SERIES';
        const worksheet = workbook.addWorksheet(nameSheet);

        // Agregar datos al archivo Excel
        const dataInfo = await trade.findAll({});
        const colum = [
            {
                header:'RAZON SOCIAL',
                key:'business_name'
            },
            {
                header:'RUC',
                key:'ruc'
            },
            {
                header:'NEGOCIO',
                key:'trade_business'
            },
            {
                header:'DIRECCION',
                key:'address'
            },
            {
                header:'UBICACION',
                key:'ubication',
            },
            {
                header:'LICENCIA',
                key:'license',
            },
            {
                header:'SERIE FACTURA ELECTRONICA',
                key:'electronic_series_fe',
            },
            {
                header:'SERIE BOLETA ELECTRONICA',
                key:'electronic_series_be'
            },
            {
                header:'SERIE NOTA DE CREDITO',
                key:'electronic_series_ncf'
            },
            {
                header:'SERIE NOTA DE DEBITO',
                key:'electronic_series_ncb'
            }
        ]
        worksheet.columns = colum;

        const data = dataInfo

        worksheet.addRows(data);

        // Configurar las cabeceras de respuesta
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=datos.xlsx');

        // Enviar el archivo Excel como respuesta
        await workbook.xlsx.write(res);
        res.end();
    } catch (err) {
        ResponseException(res, 500, 'EXCEPTION EXPORT EXCEL')
    }
}

module.exports = { get_all, create, updated, changeStatus, get_for_ruc, get_series_for_business, exportExcel }