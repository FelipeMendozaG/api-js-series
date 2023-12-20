const fs = require('fs');
const saveLog = (err) => {
    const logMessage = `${new Date().toISOString()} - Error: ${err.message}\nStack trace: ${err.stack}\n\n`;

    fs.appendFile(`./log/${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}-error.log`, logMessage, (err) => {
        if (err) {
            console.error('Error al escribir en el archivo de registro:', err);
        } else {
            console.log('Registro de error creado con éxito en error.log');
        }
    });
}
module.exports = {saveLog}