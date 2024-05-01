const projectsModel = require("../../models/projects.js");
const fs = require("fs");
const path = require("path");

const controlAddProject = async (req, res) => {
  const projectImage = {
    data: fs.readFileSync(
      path.join(__dirname + "/uploads/" + req.file.filename)
    ),
    name: req.file.filename,
    ContentType: req.file.mimetype,
  };

  try {
    const newProject = new projectsModel({
      ...req.body.projectDetails,
      projectImage,
    });

    await newProject.save();

    const projects = await projectsModel.find({});

    return res.status(200).send({
      message: "project uploaded successfully",
      success: true,
      projects,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = controlAddProject;
