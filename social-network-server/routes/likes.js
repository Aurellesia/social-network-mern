const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares");

const likesController = require("../controllers/likes");

router.post("/likes/:id", verifyToken, likesController.like);
router.get("/likes/:id", verifyToken, likesController.index);

module.exports = router;
