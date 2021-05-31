const nodemailer = require('nodemailer');
const user = "admin@useyourcrypto.org";
const password = "w2Hweh86LkEw";
const transport = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 587,
    secure: false, // use TLS
    auth: {
      user: user,
      pass: password
    }
  });
exports.sendVerificationMail = async (user)=>{
    try {
        let URI = `https://useyourcrypto.org/verify-mail/${user.emailPhrase}`;
        let text = `
            <h5>Hey ${user.name},</h5>
            Please verify Your mail by chicking this think below to continue:
            <br><br>
            <a href="${URI}">${URI}</a>
        `;
        var message = {
            from: {name:"USE Crypto", address:"admin@useyourcrypto.org>"},
            to: "useyourcrypto1@gmail.com",
            subject: "Verify Your Account",
            html: text
          };
        await transport.sendMail(message);
    } catch (error) {
        console.log(error);
        new Promise.reject(error);
    }
}