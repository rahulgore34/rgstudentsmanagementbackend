const express = require("express");
const router = express.Router();
const {getAdmin, addAdmin}  =  require("../controllers/admin-ctrl");

router.route("/")
.get(getAdmin)
.post(addAdmin);

module.exports = router;