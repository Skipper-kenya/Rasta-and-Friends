const profileModel = require("../../models/profile.js");

const controlGetProfilePic = async (req, res) => {
  const id = req.params.id;
  try {
    const profile = await profileModel.findById(id);
    const file = `${__dirname}/profileImages/${profile?.image[0].name}`;
    res.download(file);
  } catch (error) {
    console.log(console.log(error.message));
  }
};
module.exports = controlGetProfilePic;
