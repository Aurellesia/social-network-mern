const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares");

const timelineController = require("../controllers/timeline");

router.get("/", verifyToken, timelineController.timeline);
router.get("/search", verifyToken, timelineController.search);

module.exports = router;
