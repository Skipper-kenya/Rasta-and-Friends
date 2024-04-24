const profileModel = require("../../models/profile.js");

const controlDeleteProject = async (req, res) => {
  const { id } = req.body;
  try {
    await profileModel.findByIdAndDelete({ _id: id });
    const profile = await profileModel.findById({ _id: id });
    return res.status(200).send({
      message: "profile deleted successfully",
      profile,
      success: true,
    });
  } catch (error) {
    console.log(console.log(error.message));
  }
};
module.exports = controlDeleteProject;
