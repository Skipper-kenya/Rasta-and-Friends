const userModel = require("../../models/user.js");

const controlGetUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    user.password = "";
    return res.status(200).send({ success: true, detailss: user });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = controlGetUser;
