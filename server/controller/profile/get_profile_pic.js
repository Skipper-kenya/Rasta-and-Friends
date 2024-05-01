const profileModel = require("../../models/profile.js");

const controlGetProfilePic = async (req, res) => {
  const id = req.params.id;
  try {
    const profile = await profileModel.findById(id);
    // const file = `${__dirname}/uploads/${profile?.image[0].name}`;
    // res.download(file);
    res.status(200).send({ data: profile?.image.data });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = controlGetProfilePic;
