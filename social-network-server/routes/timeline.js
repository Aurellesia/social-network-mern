const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares");

const timelineController = require("../controllers/timeline");

router.get("/timeline", verifyToken, timelineController.timeline);

module.exports = router;
