const projectsModel = require("../../models/projects");

const controlGetProjects = async (req, res) => {
  const id = req.params.id;
  try {
    const projects = await projectsModel.find({});

    return res.status(200).send({ success: true, projects });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = controlGetProjects;
