const Post = require("../models/posts");
const Comment = require("../models/comments");
const { ObjectId } = require("mongodb");

const store = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const { text } = req.body;
    const comment = new Comment({ user, post: id, text });
    await comment.save();
    const post = await Post.findOneAndUpdate(
      { _id: id },
      { $push: { comments: comment } },
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.json({
        error: 1,
        message: "Post not found!",
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

const index = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById({ _id: id });
    if (!post) {
      return res.json({
        error: 1,
        message: "Post not found!",
      });
    }
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

const view = async (req, res, next) => {
  try {
    const { id } = req.params;
    let comment = await Comment.findById({ _id: id });
    if (!comment) {
      return res.json({
        error: 1,
        message: `Comment not found!`,
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
        message:
          "Comment not found or you are not allowed to edit this comment",
      });
    }
    return res.json({
      message: `Update comment success`,
      data: comment,
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

const destroy = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const user = req.user;
    const comment = await Comment.findOne({ _id: ObjectId(commentId) });
    if (comment === null) {
      res.json({
        err: 1,
        message:
          "Comment not found or you are not allowed to delete this comment",
      });
    } else {
      await Post.updateOne(
        { comments: { $elemMatch: comment } },
        { $pull: { comments: comment } },
        { new: true, runValidators: true }
      );
      await Comment.deleteOne(comment);

      return res.json({
        message: "Delete comment success",
      });
    }

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

const like = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const user = req.user._id;
    let comment = await Comment.findById({ _id: commentId });
    const post = await Post.findOne({
      comments: { $elemMatch: { _id: ObjectId(commentId) } },
    });
    if (!comment) {
      res.json({
        err: 1,
        message: "Comment not found!",
      });
    }
    if (comment.likes.indexOf(user) === -1) {
      comment = await Comment.findByIdAndUpdate(
        { _id: commentId },
        { $push: { likes: user } },
        { new: true, runValidators: true }
      );
      comment = await Comment.find({
        post: post._id,
      });
      await Post.updateOne(
        { comments: { $elemMatch: { _id: ObjectId(commentId) } } },
        { $set: { comments: comment } },
        { new: true, runValidators: true }
      );
    } else {
      comment = await Comment.findByIdAndUpdate(
        { _id: commentId },
        { $pull: { likes: user } },
        { new: true, runValidators: true }
      );
      comment = await Comment.find({
        post: post._id,
      });
      await Post.updateOne(
        { comments: { $elemMatch: { _id: ObjectId(commentId) } } },
        { $set: { comments: comment } },
        { new: true, runValidators: true }
      );
    }
    if (!comment) {
      return res.json({
        error: 1,
        message: `Comment not found`,
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

module.exports = { store, index, update, destroy, like, view };
