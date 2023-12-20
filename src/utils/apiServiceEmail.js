const nodemailer = require("nodemailer");

const SendEmail = async (err, emailto, code_exception) => {
    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "ba3c019e93c4be",
            pass: "59fe8de93b3cce"
        }
    });
    await transport.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: `${emailto}`,
        subject: `${code_exception}`,
        html: `
        ========================================= 
                \n ${err.message} \n
        ==========================================
        <b>${err.stack}</b>`,
    });
}
module.exports = {SendEmail}