const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    privacy: {
      type: String,
      default: "public",
    },
    image: {
      name: String,
      data: Buffer,
      ContentType: String,
    },
    postOwner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    postUsername: {
      type: String,
      required: true,
    },
    skills: [
      {
        type: String,
        required: true,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    answers: [
      {
        type: String,
      },
    ],
    updatedAt: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: false }
);

postsSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const postsModel = mongoose.model("posts", postsSchema);

module.exports = postsModel;
