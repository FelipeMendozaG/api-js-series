require('dotenv').config();
const express = require('express');
const app = express();
const env = require('./src/config/env');
const {dbconnectMysql} = require('./src/config/database');
const cors = require('cors');
app.use(cors());
app.use(express.json());
const PORT = env.port || 4005;
app.use('/api',require('./src/routes'))

app.listen(PORT,()=>{
    console.log('Esta corriendo en localhost: http://localhost:'+PORT);
});
dbconnectMysql();