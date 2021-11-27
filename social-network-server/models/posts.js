const mongoose = require("mongoose");
const { Schema, model } = mongoose;

let postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
      maxlength: [300, "Maximum text 300 characters"],
    },
    videos: [String],
    images: [String],
    comments: [String],
    likes: [Number],
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
