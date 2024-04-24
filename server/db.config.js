const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = (cb) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      return cb();
    })
    .catch((err) => {
      {
        console.log(err.message);
      }
    });
};

module.exports = dbConnection;
