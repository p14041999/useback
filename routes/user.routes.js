const {
  getInfo,
  signup,
  verifyMail,
  signin,
  forgotPassword,
  forgotPasswordMail,
} = require("../controllers/user.controller");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { resendVerificationMail } = require("../controllers/mail.controller");
const route = require("express").Router();

//=======================================
// Restricted Routes
//=======================================
route.get(
  "/get-user",
  async (req, res, next) => {
    let token = req.headers["x-auth-token"];
    // console.log('X-AUTH-TOKEN:',token);
    let payload = jwt.verify(token, process.env.SECRET_HASH);
    // console.log('PAYLOAD:',payload);
    let user = await User.findById(payload.id);
    if (user) {
      req.user = user._id;
      next();
    } else {
      next("Sorry Invalid Authentication!");
    }
  },
  getInfo
);

//=======================================
// Public Routes
//=======================================

route.post("/register", signup);
route.post("/login", signin);
route.post("/verify-mail", verifyMail);
route.post("/resend-mail", resendVerificationMail);
route.post("/forgot-password", forgotPassword);
route.post("/set-new-pasword", forgotPasswordMail);

//========================================
// Export Route
//========================================
module.exports = route;
