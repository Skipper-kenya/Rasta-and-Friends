const postsModel = require("../../models/posts");

const controlAddPost = async (req, res) => {
  const { postDetails, postOwner, postUsername } = req.body;

  const filename = req.file?.filename || null;
  const privaccy = postDetails.privacy;

  try {
    const newPost = new postsModel({
      ...postDetails,
      privacy: !privaccy ? "public" : privaccy,
      postOwner,
      postUsername,
      filename,
    });
    await newPost.save();

    const posts = await postsModel.find({}).sort({ updatedAt: -1 });

    return res
      .status(200)
      .send({ success: true, message: "post created", posts });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = controlAddPost;
