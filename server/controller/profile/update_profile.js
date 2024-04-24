const profileModel = require("../../models/profile.js");

const controlUpdateProfile = async (req, res) => {
  try {
    const { _id, editContent, title } = req.body;
    let skills = [];
    title === "skills" ? (skills = [...editContent.split(",")]) : null;

    const profileUpdate = await profileModel.findByIdAndUpdate(
      _id,
      title === "skills"
        ? { [title]: `${skills}` }
        : { [title]: `${editContent}` },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      profile: profileUpdate,
      message: "profile update successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = controlUpdateProfile;
