const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares");

const accountController = require("../controllers/accounts");

router.put("/change-password", verifyToken, accountController.changePassword);

module.exports = router;
