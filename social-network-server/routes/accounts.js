const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares");

const accountController = require("../controllers/accounts");

router.get("/account", verifyToken, accountController.index);
router.put("/account/edit", verifyToken, accountController.update);
router.put(
  "/account/change-password",
  verifyToken,
  accountController.changePassword
);

module.exports = router;
