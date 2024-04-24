const postsModel = require("../../models/posts");
const userModel = require("../../models/user");
const { ObjectId } = require("mongodb");
const controlAnswerPost = async (req, res) => {
  const { answer, post_id, user_id } = req.body;

  try {
    const post = await postsModel.findById(post_id);
    const user = await userModel.findOne({ username: post?.postUsername });

    user.unreadMessages?.push({ answer, username: post.postUsername });

    post.answers.push(answer);
    await post.save();

    const posts = await postsModel.find({}).sort({ updatedAt: -1 });

    await user.save();

    return res.status(200).send({
      success: true,
      message: "answer successfully posted",
      posts,
      dets: user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = controlAnswerPost;
