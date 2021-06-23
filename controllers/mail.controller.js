const nodemailer = require("nodemailer");
const User = require("../models/user");
const user = "admin@useyourcrypto.org";
const password = "w2Hweh86LkEw";
const transport = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 587,
  secure: false, // use TLS
  auth: {
    user: user,
    pass: password,
  },
});
exports.sendVerificationMail = async (user) => {
  try {
    let URI = `https://useyourcrypto.org/verify-mail/${user.emailPhrase}`;
    let text = `
            <h5>Hey ${user.name},</h5>
            Please verify Your mail by clicking this link below to continue:
            <br><br>
            <a href="${URI}">${URI}</a>
        `;
    var message = {
      from: { name: "USE Crypto", address: "admin@useyourcrypto.org" },
      to: user.email,
      subject: "Verify Your Account",
      html: text,
    };
    await transport.sendMail(message);
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
};

exports.resendVerificationMail = async (req, res) => {
  try {
    let user = await User.findById(req.body.userId);
    console.log(user);
    await sendVerificationMail(user);
    console.log("comp");
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
};
