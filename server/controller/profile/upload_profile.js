const profileModel = require("../../models/profile.js");
const fs = require("fs");
const path = require("path");
const controlUploadProfile = async (req, res) => {
  const { firstName, secondName, _id } = req.body.details;

  const profileImage = {
    data: fs.readFileSync(
      path.join(__dirname + "/uploads/" + req.file.filename)
    ),
    name: req.file.filename,
    ContentType: req.file.mimetype,
  };
  try {
    const newProfile = new profileModel({
      ...req.body.details,
      name: firstName + " " + secondName,
      profileOwner: _id,
      image: profileImage,
    });
    await newProfile.save();

    const profile = await profileModel.findByIdAndUpdate(
      _id,
      { uploaded: true },
      { new: true }
    );

    return res.status(200).send({
      message: "profile updated successfully",
      success: true,
      profile,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = controlUploadProfile;