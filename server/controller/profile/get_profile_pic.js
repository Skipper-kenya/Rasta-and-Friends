const profileModel = require("../../models/profile.js");

const controlGetProfilePic = async (req, res) => {
  const id = req.params.id;
  try {
    const profile = await profileModel.findById(id);
  } catch (error) {
    console.log(console.log(error.message));
  }
};
module.exports = controlGetProfilePic;
