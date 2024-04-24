const projectsModel = require("../../models/projects.js");

const controlAddProject = async (req, res) => {
  const projectImage = [{ name: req.file.filename }, { path: req.file.path }];

  try {
    const newProject = new projectsModel({
      ...req.body.projectDetails,
      projectImage,
    });

    await newProject.save();

    const projects = await projectsModel.find({});

    return res
      .status(200)
      .send({
        message: "project uploaded successfully",
        success: true,
        projects,
      });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = controlAddProject;
