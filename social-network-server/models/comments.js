const mongoose = require("mongoose");
const { Schema, model } = mongoose;

let commentSchema = new Schema(
  {
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
    user: Object,
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    text: {
      type: String,
      required: [true, "Text cannot be empty"],
      maxlength: [1000, "Maximum text 1000 characters"],
    },
    likes: [Schema.Types.ObjectId],
    replies: [Object],
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema);
