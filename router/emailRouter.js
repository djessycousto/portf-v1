const express = require("express");
const router = express.Router();

const sendEmailHandler = require("../controller/email");

router.route("/contactUS").post(sendEmailHandler);
module.exports = router;
