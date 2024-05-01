const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    githubLink: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skills: [
      {
        type: String,
        required: true,
      },
    ],
    image: {
      data: Buffer,
      name: String,
      ContentType: String,
    },

    profileOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    uploaded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const profileModel = mongoose.model("profile", profileSchema);

module.exports = profileModel;
