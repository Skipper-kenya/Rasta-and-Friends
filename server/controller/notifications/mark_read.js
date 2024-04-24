const userModel = require("../../models/user");

const controlMarkRead = async (req, res) => {
  const { idx, _id, message } = req.body;

  try {
    const user = await userModel.findById(_id);
    const unreadNotifications = !message
      ? user.unreadNotifications
      : user.unreadMessages;

    const readMessage = unreadNotifications.pop(idx);

    !message
      ? user.readNotifications.push(readMessage)
      : user.readMessages.push(readMessage);

    await user.save();

    user.password = "";

    return res.status(200).send({ success: true, dets: user });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = controlMarkRead;
