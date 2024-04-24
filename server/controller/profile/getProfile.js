const profileModel = require("../../models/profile.js");

const controlGetProfile = async (req, res) => {
  const _id = req.params.id;
  try {
    const profile = await profileModel.findById({ _id });
    res.status(200).send({ success: true, profile });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = controlGetProfile;
