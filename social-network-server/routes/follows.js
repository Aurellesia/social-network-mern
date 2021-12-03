const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares");

const followController = require("../controllers/follows");

router.post("/follows/:id", verifyToken, followController.follows);
router.get("/followers/:userId", verifyToken, followController.followers);
router.get("/following/:userId", verifyToken, followController.following);

module.exports = router;
