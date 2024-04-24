const userModel = require("../../models/user.js");

const bcrypt = require("bcryptjs");

const controlRegister = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({ username });

    if (user) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ username, password: hashedPassword });

    await newUser.save();

    return res
      .status(200)
      .send({ message: "user created, proceed to login", success: true });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = controlRegister;
