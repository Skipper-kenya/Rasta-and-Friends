const postsModel = require("../../models/posts");

const controlGetPosts = async (req, res) => {
  try {
    const posts = await postsModel.find({}).sort({ updatedAt: -1 });

    return res.status(200).send({ success: true, posts });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = controlGetPosts;
