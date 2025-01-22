
const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    projectLink: {
      type: String,
    },
    projectGithub: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    projectLikes: {
      type: Number,
      default: 0,
    },
    projectLikeOwners: [
      {
        type: String,
      },
    ],
    projectSkills: [
      {
        type: String,
        required: true,
      },
    ],
    projectImage: {
      data: Buffer,
      name: String,
      ContentType: String,
    },

    username: {
      type: String,
      required: true,
    },
    projectOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const projectsModel = mongoose.model("projects", projectsSchema);

module.exports = projectsModel;
