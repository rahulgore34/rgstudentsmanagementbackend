const express = require("express");
const router = express.Router();
const {getAdmin, addAdmin, getConfidencialAdmin}  =  require("../controllers/admin-ctrl");

router.route("/")
.get(getAdmin)


router.route("/confidencialadminsignup")
.post(addAdmin);

module.exports = router;