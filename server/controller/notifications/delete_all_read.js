const userModel = require("../../models/user");

const controlDeleteAllRead = async (req, res) => {
  const { _id, message } = req.body;
  try {
    const user = await userModel.findById(_id);

    !message ? (user.readNotifications = []) : (user.readMessages = []);

    await user.save();

    user.password = "";

    return res.status(200).send({ success: true, dets: user });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = controlDeleteAllRead;
