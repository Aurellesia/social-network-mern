const User = require("../models/users");
const path = require("path");
const fs = require("fs");
const config = require("../config");

const index = async (req, res, next) => {
  try {
    const user = req.user;
    let profile = await User.findById({ _id: user._id });
    if (!profile) {
      return res.json({
        error: 1,
        message: "No user found!",
      });
    }
    return res.json(profile);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
      });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    let payload = req.body;
    const profile = await User.findByIdAndUpdate(
      { _id: req.user._id },
      payload,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!profile) {
      return res.json({
        error: 1,
        message: "No user found!",
      });
    }
    const result = {
      message: "Update success",
      data: profile,
    };

    return res.json(result);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const updateProfilePicture = async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.json({
      error: 1,
      message: "No file selected",
    });
  }

  let tmp_path = file.path;
  let originalExt =
    req.file.originalname.split(".")[
      req.file.originalname.split(".").length - 1
    ];
  let filename = req.file.filename + "." + originalExt;
  let target_path = path.resolve(
    config.rootPath,
    `public/images/profiles/${filename}`
  );
  const src = fs.createReadStream(tmp_path);
  const dest = fs.createWriteStream(target_path);
  src.pipe(dest);

  src.on("end", async () => {
    try {
      let profile = await User.findById({ _id: req.user._id });
      if (!profile) {
        return res.json({
          error: 1,
          message: "User not found!",
        });
      }
      let previousImage = `${config.rootPath}/public/images/profiles/${profile.picture}`;
      profile = await User.findByIdAndUpdate(
        { _id: req.user._id },
        { picture: filename },
        { new: true, runValidators: true }
      );
      if (previousImage !== `${config.rootPath}/public/images/profiles/`) {
        fs.unlinkSync(previousImage);
      }
      return res.json({
        message: "Update profile picture success",
        data: profile,
      });
    } catch (err) {
      fs.unlinkSync(target_path);
      if (err && err.name === "ValidationError") {
        return res.json({
          error: 1,
          message: err.message,
          fields: err.errors,
        });
      }
      next(err);
    }
  });
};

const destroyProfilePicture = async (req, res, next) => {
  try {
    const imageUrl = `${config.rootPath}/public/images/profiles/`;
    let profile = await User.findById({ _id: req.user._id });
    if (!profile) {
      return res.json({
        error: 1,
        message: "User not found!",
      });
    }
    let previousImage = `${imageUrl}${profile.picture}`;
    if (previousImage !== imageUrl) {
      fs.unlinkSync(previousImage);
    }
    if (profile.picture !== "") {
      profile = await User.findByIdAndUpdate(
        { _id: req.user._id },
        { picture: "" },
        { new: true, runValidators: true }
      );
    }
    return res.json({
      message: "Delete profile picture success",
      data: profile,
    });
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const indexById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.json({
        error: 1,
        message: "User not found!",
      });
    }
    return res.json(user);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

module.exports = {
  index,
  update,
  updateProfilePicture,
  destroyProfilePicture,
  indexById,
};
