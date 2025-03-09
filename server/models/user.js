
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    unreadNotifications: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
    readNotifications: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
    unreadMessages: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
    readMessages: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
