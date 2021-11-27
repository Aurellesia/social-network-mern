const mongoose = require("mongoose");
const { Schema, model } = mongoose;

let profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    picture: {
      type: String,
      default: "",
    },
    job: {
      type: String,
      maxLength: [50, "Maximum job length is 50 characters"],
      default: "",
    },
    workplace: {
      type: String,
      maxLength: [100, "Maximum workplace length is 100 characters"],
      default: "",
    },
    current_city: {
      type: String,
      maxLength: [50, "Maximum current city length is 50 characters"],
      default: "",
    },
    bio: {
      type: String,
      maxLength: [70, "Maximum bio length is 70 characters"],
      default: "",
    },
    education: {
      type: String,
      maxLength: [100, "Maximum education length is 100 characters"],
      default: "",
    },
    linkedin: {
      type: String,
      maxLength: [100, "Maximum linkedin length is 100 characters"],
      default: "",
    },
    instagram: {
      type: String,
      maxLength: [100, "Maximum instagram length is 100 characters"],
      default: "",
    },
    twitter: {
      type: String,
      maxLength: [100, "Maximum twitter length is 100 characters"],
      default: "",
    },
    business_email: {
      type: String,
      maxLength: [100, "Maximum business email length is 100 characters"],
      default: "",
    },
    telegram: {
      type: String,
      maxLength: [100, "Maximum telegram length is 100 characters"],
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = model("Profile", profileSchema);
