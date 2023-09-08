const { Sequelize } = require('sequelize');
const env = require('./env');

const database = env.database;
const username = env.username;
const password = env.password;
const host = env.host;
const dialect = env.dialect;
const port = env.db_port;

const sequelize=new Sequelize(
    database,username,password,{
        host,port,
        dialect
    }
);
// METODO DE CONEXION
const dbconnectMysql = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexion correcta');
    } catch (err) {
        console.log(err);
    }
}

module.exports = { sequelize, dbconnectMysql }