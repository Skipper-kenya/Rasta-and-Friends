const userModel = require("../../models/user");

const controlMarkAllRead = async (req, res) => {
  const { _id, message } = req.body;

  try {
    const user = await userModel.findById(_id);
    let unreadNotifications = !message
      ? user.unreadNotifications
      : user.unreadMessages;

    !message
      ? user.readNotifications.push(...unreadNotifications)
      : user.readMessages.push(...unreadNotifications);

    !message ? (user.unreadNotifications = []) : (user.unreadMessages = []);

    await user.save();

    user.password = "";

    return res.status(200).send({ success: true, dets: user });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = controlMarkAllRead;
