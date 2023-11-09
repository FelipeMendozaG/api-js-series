const { matchedData } = require("express-validator");
const { trade, trade_series, license, trade_logs, type } = require("../models/index")
const { ResponseException, ResponseOk, ResponseError } = require("../utils/apiResponse");
const { SerieCorrelative } = require("../utils/handleSeries")
const ExcelJS = require('exceljs');
const multer = require('multer');

const get_all = async (req, res) => {
    try {
        const { query } = req;
        if (Object.keys(query).length > 0) {
            const MyTrade = await trade.findAll({ where: { ruc: query.param }, include: [{ model: license }] });
            return ResponseOk(res, 200, MyTrade);
        }
        const MyTrade = await trade.findAll({
            include: [
                { model: license, as: 'license' },
                { model: type, as: 'channel' },
                { model: type, as: 'center' },
                { model: type, as: 'ubication' },
                { model: type, as: 'debtor' },
                { model: type, as: 'center_charity' },
                { model: type, as: 'sale_organization' }
            ]
        });
        return ResponseOk(res, 200, MyTrade);
    } catch (err) {
        console.log(err);
        return ResponseException(res, 500, 'ERROR_GET_ALL_BUSNESS')
    }
}

const get_for_license = async (req, res) => {
    try {
        const { code_license: license } = req.body;
        const tradelist = await trade_logs.findAll({ where: { license } });
        return ResponseOk(res, 200, tradelist);
    } catch (err) {
        return ResponseException(res, 500, 'EXCEPTION_GET_FOR_LICENSE');
    }
}

const create = async (req, res) => {
    try {
        const { type_license, is_duplicate } = req.body;
        let body = matchedData(req);
        // CREAMOS CAMPOS SI NO EXISTEN
        const { __isNew__: isNewSale, ...objeSale } = body.sale_organization;
        const { __isNew__: isNewChannel, ...objChannel } = body.channel
        const { __isNew__: isNewDeb, ...objDeb } = body.debtor
        const { __isNew__: isNewCent, ...objCent } = body.center
        const { __isNew__: isNewLic, ...objLic } = body.license
        const { __isNew__: isNewUbica, ...objUbic } = body.ubication
        const { __isNew__: isNewCenterCharity, ...objCenterCharity } = body.center_charity
        //
        const otherObj = {
            sale_organization: { ...objeSale },
            channel: { ...objChannel },
            debtor: { ...objDeb },
            center: { ...objCent },
            licence: { ...objLic },
            ubication: { ...objUbic },
            center_charity: { ...objCenterCharity }
        }
        if (isNewSale) {
            const [{ id }] = await type.findOrCreate({
                where: {
                    name: objeSale.label,
                    code: 'C-CREA',
                    type_group_id: 4,
                },
                defaults: {
                    code: 'C-CREA',
                    name: objeSale.label,
                    type_group_id: 4,
                    is_active: true
                }
            })
            otherObj.sale_organization = { ...otherObj.sale_organization, value: id }
        }
        if (isNewChannel) {
            const [{ id }] = await type.findOrCreate({
                where: {
                    code: 'CH-CREA',
                    name: objChannel.label,
                    type_group_id: 6,
                },
                defaults: {
                    code: 'CH-CREA',
                    name: objChannel.label,
                    type_group_id: 6,
                    is_active: true
                }
            });
            otherObj.channel = { ...otherObj.channel, value: id };
        }
        if (isNewDeb) {
            const [{ id }] = await type.findOrCreate({
                where: {
                    code: 'DEB-CREA',
                    name: objDeb.label,
                    type_group_id: 3,
                },
                defaults: {
                    code: 'DEB-CREA',
                    name: objDeb.label,
                    type_group_id: 3,
                    is_active: true
                }
            })
            otherObj.debtor = { ...otherObj.debtor, value: id }
        }
        if (isNewCent) {
            const [{ id }] = await type.findOrCreate({
                where: {
                    code: 'CENT-CREA',
                    name: objCent.label,
                    type_group_id: 5,
                },
                defaults: {
                    code: 'CENT-CREA',
                    name: objCent.label,
                    type_group_id: 5,
                    is_active: true
                }
            });
            otherObj.center = { ...otherObj.center, value: id }
        }
        if (isNewLic) {
            // ESTO ES SOLO CUANDO ES UNA NUEVA LICENCIA
            const [{ id }] = await license.findOrCreate({
                where: {
                    code_license: ((objLic.label).split(' '))[0],
                    is_manager: type_license ?? false
                },
                defaults: {
                    code_license: ((objLic.label).split(' '))[0],
                    box_count: 1,
                    is_manager: type_license ?? false
                }
            });
            otherObj.licence = { ...otherObj.licence, value: id }
        }
        if (isNewUbica) {
            const [{ id }] = await type.findOrCreate({
                where: {
                    code: 'UBI-CREA',
                    name: objUbic.label,
                    type_group_id: 2,
                },
                defaults: {
                    code: 'UBI-CREA',
                    name: objUbic.label,
                    type_group_id: 2,
                    is_active: true
                }
            });
            otherObj.ubication = { ...otherObj.ubication, value: id }
        }
        if (isNewCenterCharity) {
            const [{ id }] = await type.findOrCreate({
                where: {
                    code: 'CENT-CHARI-CREA',
                    name: objCenterCharity.label,
                    type_group_id: 7,
                },
                defaults: {
                    code: 'CENT-CHARI-CREA',
                    name: objCenterCharity.label,
                    type_group_id: 7,
                    is_active: true
                }
            })
            otherObj.center_charity = { ...otherObj.center_charity, value: id }
        }
        //
        body = {
            ...body,
            sale_organization_id: otherObj.sale_organization.value,
            channel_id: otherObj.channel.value,
            debtor_id: otherObj.debtor.value,
            center_id: otherObj.center.value,
            center_charity_id: otherObj.center_charity.value,
            licence_id: otherObj.licence.value,
            ubication_id: otherObj.ubication.value,

            sale_organization: otherObj.sale_organization.label,
            channel: otherObj.channel.label,
            debtor: otherObj.debtor.label,
            center: otherObj.center.label,
            center_charity: otherObj.center_charity.label,
            license: otherObj.licence.label,
            ubication: otherObj.ubication.label,

        };
        const MyTrade = await trade.create(body);
        await trade_logs.create({ ...body, duplicate_series: false, trade_id: MyTrade.id });
        const { ruc, business_name, licence_id } = body;
        const tradeObj = {
            electronic_series_fe: SerieCorrelative(body.electronic_series_fe),
            electronic_series_be: SerieCorrelative(body.electronic_series_be),
            electronic_series_ncf: SerieCorrelative(body.electronic_series_ncf),
            electronic_series_ncb: SerieCorrelative(body.electronic_series_ncb)
        }
        //ACTUALIZAMOS LA LICENCIA
        if (type_license) {
            const MyTrade = await trade.findAll({ where: { licence_id } });
            await license.update({ box_count: MyTrade.length, is_manager: type_license }, { where: { id: licence_id } })
        }
        const TradeSeries = await trade_series.findOne({ where: { ruc } });
        if (TradeSeries == null || TradeSeries == undefined) {
            await trade_series.create({ ...tradeObj, ruc, business_name });
            return ResponseOk(res, 201, MyTrade);
        }
        await trade_series.update({ ...tradeObj, business_name }, { where: { ruc } });
        return ResponseOk(res, 201, MyTrade);
    } catch (err) {
        console.log(err);
        return ResponseException(res, 500, 'ERROR_EXCEPTION_CREATE_BUSINESS')
    }
}

const updated = async (req, res) => {
    try {
        const { is_duplicate } = req.body;
        const { id } = req.params;
        let body = matchedData(req);
        const { __isNew__: isNewSale, ...objeSale } = body.sale_organization;
        const { __isNew__: isNewChannel, ...objChannel } = body.channel
        const { __isNew__: isNewDeb, ...objDeb } = body.debtor
        const { __isNew__: isNewCent, ...objCent } = body.center
        const { __isNew__: isNewLic, ...objLic } = body.license
        const { __isNew__: isNewUbica, ...objUbic } = body.ubication
        const { __isNew__: isNewCenterCharity, ...objCenterCharity } = body.center_charity

        const otherObj = {
            sale_organization: { ...objeSale },
            channel: { ...objChannel },
            debtor: { ...objDeb },
            center: { ...objCent },
            licence: { ...objLic },
            ubication: { ...objUbic },
            center_charity: { ...objCenterCharity }
        }
        if (isNewSale) {
            const [{ id }] = await type.findOrCreate({
                where: {
                    name: objeSale.label,
                    code: 'C-CREA',
                    type_group_id: 4,
                },
                defaults: {
                    code: 'C-CREA',
                    name: objeSale.label,
                    type_group_id: 4,
                    is_active: true
                }
            })
            otherObj.sale_organization = { ...otherObj.sale_organization, value: id }
        }
        if (isNewChannel) {
            const [{ id }] = await type.findOrCreate({
                where: {
                    code: 'CH-CREA',
                    name: objChannel.label,
                    type_group_id: 6,
                },
                defaults: {
                    code: 'CH-CREA',
                    name: objChannel.label,
                    type_group_id: 6,
                    is_active: true
                }
            });
            otherObj.channel = { ...otherObj.channel, value: id };
        }
        if (isNewDeb) {
            const [{ id }] = await type.findOrCreate({
                where: {
                    code: 'DEB-CREA',
                    name: objDeb.label,
                    type_group_id: 3,
                },
                defaults: {
                    code: 'DEB-CREA',
                    name: objDeb.label,
                    type_group_id: 3,
                    is_active: true
                }
            })
            otherObj.debtor = { ...otherObj.debtor, value: id }
        }
        if (isNewCent) {
            const [{ id }] = await type.findOrCreate({
                where: {
                    code: 'CENT-CREA',
                    name: objCent.label,
                    type_group_id: 5,
                },
                defaults: {
                    code: 'CENT-CREA',
                    name: objCent.label,
                    type_group_id: 5,
                    is_active: true
                }
            });
            otherObj.center = { ...otherObj.center, value: id }
        }
        if (isNewLic) {
            // ESTO ES SOLO CUANDO ES UNA NUEVA LICENCIA
            const [{ id, code_license }] = await license.findOrCreate({
                where: {
                    code_license: ((objLic.label).split(' '))[0],
                    is_manager: type_license ?? false
                },
                defaults: {
                    code_license: ((objLic.label).split(' '))[0],
                    box_count: 1,
                    is_manager: type_license ?? false
                }
            });
            otherObj.licence = { ...otherObj.licence, value: id, label: code_license }
        }
        if (isNewUbica) {
            const [{ id }] = await type.findOrCreate({
                where: {
                    code: 'UBI-CREA',
                    name: objUbic.label,
                    type_group_id: 2,
                },
                defaults: {
                    code: 'UBI-CREA',
                    name: objUbic.label,
                    type_group_id: 2,
                    is_active: true
                }
            });
            otherObj.ubication = { ...otherObj.ubication, value: id }
        }
        if (isNewCenterCharity) {
            const [{ id }] = await type.findOrCreate({
                where: {
                    code: 'CENT-CHARI-CREA',
                    name: objCenterCharity.label,
                    type_group_id: 7,
                },
                defaults: {
                    code: 'CENT-CHARI-CREA',
                    name: objCenterCharity.label,
                    type_group_id: 7,
                    is_active: true
                }
            })
            otherObj.center_charity = { ...otherObj.center_charity, value: id }
        }

        body = {
            ...body,
            sale_organization_id: otherObj.sale_organization.value,
            channel_id: otherObj.channel.value,
            debtor_id: otherObj.debtor.value,
            center_id: otherObj.center.value,
            center_charity_id: otherObj.center_charity.value,
            licence_id: otherObj.licence.value,
            ubication_id: otherObj.ubication.value,

            sale_organization: otherObj.sale_organization.label,
            channel: otherObj.channel.label,
            debtor: otherObj.debtor.label,
            center: otherObj.center.label,
            center_charity: otherObj.center_charity.label,
            license: ((otherObj.licence.label).split(' '))[0],
            ubication: otherObj.ubication.label,

        };
        await trade.update(body, { where: { id } });
        if (is_duplicate === true) {
            body = { ...body, duplicate_series: true, trade_id: id };
            await trade_logs.create(body);
        }
        const { license: code_license } = body;
        const lic = await license.findOne({ where: { code_license } });
        if (lic === null) {
            await license.create({ code_license, box_count: 1, is_manager: false });
            return ResponseOk(res, 202, await trade.findByPk(id));
        }
        const { id: licence_id } = lic;
        const boxcount = await trade.findAll({ where: { licence_id } })
        await license.update({ licence_id, box_count: boxcount.length, is_manager: (boxcount.length > 1 ? true : false) }, { where: { id: licence_id } });
        return ResponseOk(res, 202, await trade.findByPk(id));
    } catch (err) {
        console.log(err);
        return ResponseException(res, 500, 'ERROR_UPDATE_BUSINESS')
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
            return ResponseOk(res, 200, SeriesBusiness);
        }
        return ResponseOk(res, 200, await trade.findAll({ where: { ruc } }));
    } catch (err) {
        console.log(err);
        return ResponseException(res, 500, 'EXCEPTION_GET_SERIES');
    }
};

const exportExcel = async (req, res) => {
    try {
        const workbook = new ExcelJS.Workbook();
        const nameSheet = 'SERIES';
        const worksheet = workbook.addWorksheet(nameSheet);

        // Agregar datos al archivo Excel
        const dataInfo = await trade.findAll({
            include: [
                { model: license, as: 'license' },
                { model: type, as: 'channel' },
                { model: type, as: 'center' },
                { model: type, as: 'ubication' },
                { model: type, as: 'debtor' },
                { model: type, as: 'center_charity' },
                { model: type, as: 'sale_organization' }
            ]
        });
        const colum = [
            {
                header: 'RAZON SOCIAL',
                key: 'business_name',
            },
            {
                header: 'RUC',
                key: 'ruc',
            },
            {
                header: 'NEGOCIO',
                key: 'trade_business',
            },
            {
                header: 'DIRECCION',
                key: 'address',
            },
            {
                header: 'UBICACION',
                key: 'ubication',
            },
            {
                header: 'LICENCIA',
                key: 'license'
            },
            {
                header: 'ORGANIZACION DE VENTA',
                key: 'sale_organization',
            },
            {
                header: 'CANAL',
                key: 'channel',
            },
            {
                header: 'SECTOR',
                key: 'sector',
            },
            {
                header: 'DEUDOR',
                key: 'debtor',
            },
            {
                header: 'DENOMINACION',
                key: 'denomination',
            },
            {
                header: 'CENTRO',
                key: 'center',
            },
            {
                header: 'CENTRO BENEFICO',
                key: 'center_charity',
            },
            {
                header: 'ANYDESK',
                key: 'anydesk',
            },
            {
                header: 'CODIGO ANEXO',
                key: 'attached_code',
            },
            {
                header: "IP",
                key: 'ip'
            },
            {
                header: 'HOST',
                key: 'host'
            },
            {
                header: 'NUMERO DE IDENTIFICADOR',
                key: 'number_indentifier'
            },
            {
                header: 'SERIE FACTURA ELECTRONICA',
                key: 'electronic_series_fe',
            },
            {
                header: 'SERIE BOLETA ELECTRONICA',
                key: 'electronic_series_be',
            },
            {
                header: 'SERIE NOTA CREDITO FACTURA',
                key: 'electronic_series_ncf',
            },
            {
                header: 'SERIE NOTA CREDITO BOLETA',
                key: 'electronic_series_ncb',
            }
        ]
        
        worksheet.columns = colum;

        const data = dataInfo.map((item)=>{
            const row = item.toJSON();
            return {
                ...row,
                license:row.license?.code_license ?? '',
                ubication:row.ubication?.name ?? '',
                sale_organization:row.sale_organization?.name ?? '',
                center:row.center?.name ?? '',
                channel:row.channel?.name ?? '',
                sale_organization:row.sale_organization?.name ?? '',
                debtor:row.debtor?.name ?? '',
                center_charity:row.center_charity?.name ?? ''
            }
        });

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
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const ImportExcel = async (req, res) => {
    try {
        if (!req.file) {
            return ResponseError(res, 400, ['El archivo de tipo file no existe']);
        }
        const workbook = new ExcelJS.Workbook();
        const buffer = req.file.buffer;
        const dataExcel = await workbook.xlsx.load(buffer).then(() => {
            const worksheet = workbook.getWorksheet(1); // Selecciona la hoja deseada

            const excelData = [];

            const header = [];
            worksheet.getRow(1).eachCell((cell) => {
                header.push(cell.value);
            });

            // Leer el contenido del Excel y crear un array de objetos
            worksheet.eachRow({ includeEmpty: false, firstRow: 2 }, (row) => {
                const rowData = {};
                row.eachCell((cell, colNumber) => {
                    rowData[header[colNumber - 1]] = cell.value;
                });
                excelData.push(rowData);
            });

            return excelData;
        });
        const data = dataExcel.filter((item, index) => {
            if (index !== 0) {
                return item;
            }
        });
        // PROCESO DE GUARDADO DE INFORMACION
        for (let item of data) {
            const bodyparan = {
                business_name: item["RAZON SOCIAL"],
                ruc: item.RUC,
                ubication: item.UBICACION ?? '',
                address: item.DIRECCION ?? '',
                channel: item.CANAL ?? '',
                sector: item.SECTOR ?? '',
                license: item.LICENCIA ?? '',
                trade_business: item.NEGOCIO,
                sale_organization: item["ORGANIZACION DE VENTA"] ?? '',
                debtor: item.DEUDOR ?? '',
                denomination: item.DENOMINACION ?? '',
                center: item.CENTRO ?? '',
                center_charity: item["CENTRO BENEFICO"] ?? '',
                anydesk: item.ANYDESK ?? '',
                attached_code: item["CODIGO ANEXO"] ?? '',
                electronic_series_fe: item["SERIE ELECTRONICA FE"],
                electronic_series_be: item["SERIE ELECTRONICA BE"],
                electronic_series_ncf: item["SERIE ELECTRONICA NCF"],
                electronic_series_ncb: item["SERIE ELECTRONICA NCB"]
            };
            const { id } = await trade.create(bodyparan);
            await trade_logs.create({ ...bodyparan, trade_id: id, duplicate_series: false, is_active: true });
        }
        await trade_logs.sequelize.query('CALL BD_SERIES.USP_GET_SERIES_FOR_TRADE() ')
        await trade_logs.sequelize.query('CALL BD_SERIES.USP_LOAD_BUSINESS() ')
        await trade_logs.sequelize.query('CALL BD_SERIES.USP_LOAD_LICENCES() ');
        return ResponseOk(res, 202, data);
    } catch (err) {
        return ResponseException(res, 500, 'EXCEPTION_IMPORT_EXCEL');
    }
}

const get_all_logs = async (req, res) => {
    try {
        const { trade_id } = req.body;
        const tradelogs = await trade_logs.findAll({ where: { trade_id } })
        return ResponseOk(res, 200, tradelogs)
    } catch (err) {
        return ResponseException(res, 500, 'EXCEPTION_GET_ALL_LOGS')
    }
}

const get_serie_free = async(req,res)=>{
    try{
        const {ruc,serie} = req.params;
        /* const Series = await trade.findAll({
            where:{
                ruc
            }
        })
        console.log(ser) */
        return ResponseOk(res,200,[]);
    }catch(err){
        return ResponseException(res,500,err);
    }
}

module.exports = { get_all, create, updated, changeStatus, get_for_ruc, get_series_for_business, exportExcel, ImportExcel, upload, get_for_license, get_all_logs, get_serie_free}