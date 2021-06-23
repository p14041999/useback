const express = require("express");
const router = express.Router();
const { participate, check } = require("../controllers/airdrop.controller");

router.post("/participate", participate);
router.get("/check", check);

module.exports = router;
