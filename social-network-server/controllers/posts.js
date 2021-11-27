const Post = require("../models/posts");
const config = require("../config");
const path = require("path");
const fs = require("fs");

const ALLOWED_VIDEO_EXT = ["mp4", "webm", "ogg"];
const ALLOWED_IMAGE_EXT = ["png", "jpg", "jpeg"];

const getPath = (file) => {
  return file.path;
};

const getExt = (file) => {
  return file.originalname.split(".").pop();
};

const store = async (req, res, next) => {
  try {
    let imageFiltered,
      videoFiltered,
      objectFile = [];
    const user = req.user;
    let { text } = req.body;

    if (req.files) {
      let url = ``;
      let uploadedFiles = req.files;

      uploadedFiles.forEach((item) => {
        let tmp_path = getPath(item);

        if (ALLOWED_IMAGE_EXT.includes(getExt(item))) {
          url = `public/images/posts/`;
        } else {
          url = `public/videos/posts/`;
        }

        let filename = `${item.filename}.${getExt(item)}`;
        let target_path = path.resolve(config.rootPath, `${url}${filename}`);
        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        objectFile.push({
          ext: getExt(item),
          filename,
        });
      });

      if (
        objectFile.filter((x) => !ALLOWED_IMAGE_EXT.includes(x.ext)).length !=
          0 ||
        objectFile.filter((y) => !ALLOWED_VIDEO_EXT.includes(y.ext)).length != 0
      ) {
        imageFiltered = objectFile
          .filter((x) => ALLOWED_IMAGE_EXT.includes(x.ext))
          .map((item) => item.filename);
        videoFiltered = objectFile
          .filter((y) => ALLOWED_VIDEO_EXT.includes(y.ext))
          .map((item) => item.filename);
      }
      let post = new Post({
        user: user._id,
        text,
        images: imageFiltered,
        videos: videoFiltered,
      });
      await post.save();
      res.json(post);
    } else {
      let post = new Post({
        user: user._id,
        text,
      });
      await post.save();
      res.json(post);
    }
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

const index = async (req, res, next) => {
  try {
    const user = req.user;
    let post = await Post.find({ user: user._id });
    if (!post) {
      return res.json({
        error: 1,
        message: `No post found`,
      });
    }
    return res.json(post);
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
module.exports = { store, index };
