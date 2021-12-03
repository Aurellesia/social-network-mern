const Post = require("../models/posts");
const User = require("../models/users");
const Comment = require("../models/comments");

const store = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const { text } = req.body;
    const comment = new Comment({ user, post: id, text });
    await comment.save();
    await Post.findOneAndUpdate(
      { _id: id },
      { $push: { comments: comment._id } },
      { new: true, runValidators: true }
    );
    return res.json(comment);
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
    const { id } = req.params;
    const post = await Post.findOne({ _id: id });
    let comment = await Promise.all(
      post.comments.map(async (item) => {
        let commentText = await Comment.findById({ _id: item });
        return commentText;
      })
    );
    return res.json(comment);
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

const update = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const user = req.user;
    const { text } = req.body;
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, user },
      { $set: { text } },
      {
        new: true,
        runValidators: true,
      }
    );
    if (comment === null) {
      res.json({
        err: 1,
        message: "You are not allowed to edit this comment",
      });
    }
    return res.json(comment);
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

const destroy = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const user = req.user;
    const comment = await Comment.findOneAndDelete({ _id: commentId, user });
    if (comment === null) {
      res.json({
        err: 1,
        message: "You are not allowed to edit this comment",
      });
    } else {
      await Post.findOneAndUpdate(
        { comments: { $in: [commentId] } },
        { $pull: { comments: commentId } },
        { new: true, runValidators: true }
      );
    }

    return res.json(comment);
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

const like = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const user = req.user.user_id;
    let comment = await Comment.findById({ _id: commentId });
    console.log(comment);
    if (comment.likes.indexOf(user) === -1) {
      comment = await Comment.findByIdAndUpdate(
        { _id: commentId },
        { $push: { likes: user } },
        { new: true, runValidators: true }
      );
    } else {
      comment = await Comment.findByIdAndUpdate(
        { _id: commentId },
        { $pull: { likes: user } },
        { new: true, runValidators: true }
      );
    }
    if (!comment) {
      return res.json({
        error: 1,
        message: `No comment found`,
      });
    }
    return res.json(comment);
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

module.exports = { store, index, update, destroy, like };
