const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares");
const multer = require("multer");
const os = require("os");

const profileController = require("../controllers/profiles");

router.get("/profile", verifyToken, profileController.index);
router.put("/profile/edit", verifyToken, profileController.update);
router.put(
  "/profile-picture/edit",
  multer({ dest: os.tmpdir() }).single("picture"),
  verifyToken,
  profileController.updateProfilePicture
);
router.delete(
  "/profile-picture/delete",
  verifyToken,
  profileController.destroyProfilePicture
);

module.exports = router;
