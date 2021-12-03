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
      required: [true, "Text cannot be empty"],
      maxlength: [300, "Maximum text 300 characters"],
    },
    videos: [String],
    images: [String],
    comments: [Schema.Types.ObjectId],
    likes: [Schema.Types.ObjectId],
  },
  { timestamps: true }
);

module.exports = model("Post", postSchema);
