const projectsModel = require("../../models/projects");
const userModel = require("../../models/user");
const usersModel = require("../../models/user");

const { ObjectId } = require("mongodb");

const controlAddLike = async (req, res) => {
  const { owner_id, project_id, liked } = req.body;

  try {
    const project = await projectsModel.findById({ _id: project_id });
    const user = await usersModel.findById({
      _id: new ObjectId(project.projectOwner),
    });
    const owner = await userModel.findById(owner_id);

    if (!liked) {
      project.projectLikes += 1;
      project.projectLikeOwners.push(owner_id);
      user.unreadNotifications.push({
        message: ` ${
          owner.username === user.username
            ? "You have liked your project"
            : owner.username + " has liked your project"
        } `,
      });
      await project.save();
      await user.save();
    } else {
      project.projectLikes -= 1;
      project.projectLikeOwners.pop(owner_id);
      user.unreadNotifications.pop({
        message: `${owner.username} has liked your project`,
      });
      await project.save();
      await user.save();
    }

    const allProjects = await projectsModel.find({});
    const ownerUser = await usersModel.findById(owner_id);
    ownerUser.password = "";

    return res.status(200).send({
      success: true,
      projects: allProjects,
      details: ownerUser,
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = controlAddLike;
