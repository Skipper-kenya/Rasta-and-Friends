const postsModel = require("../../models/posts");
const path = require("path");
const fs = require("fs");

const controlAddPost = async (req, res) => {
  const { postDetails, postOwner, postUsername } = req.body;

  const filename = req.file?.filename;

  const image = {
    name: filename,
    data: filename
      ? fs.readFileSync(path.join(__dirname + "/uploads/" + filename))
      : null,
    ContentType: req.file?.mimetype,
  };

  const privaccy = postDetails.privacy;

  try {
    const newPost = new postsModel({
      ...postDetails,
      privacy: !privaccy ? "public" : privaccy,
      postOwner,
      postUsername,
      image,
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
