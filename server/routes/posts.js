const { Router } = require("express");

const router = Router();
const multer = require("multer");
const path = require("path");

const verifyToken = require("../middleware/verifyToken");

const controlAddPost = require("../controller/post/add_post");
const controlGetPosts = require("../controller/post/get_posts");
const controlAnswerPost = require("../controller/post/answer_post");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "public/postsImages");
  },
  filename: (req, file, cb) => {
    return cb(null, Date.now() + path.extname(file?.originalname));
  },
});

const upload = multer({ storage });

router.post("/addPost", verifyToken, upload.single("image"), controlAddPost);
router.get("/getPosts/:id", verifyToken, controlGetPosts);
router.post("/answerPost", verifyToken, controlAnswerPost);

const postsRoute = router;

module.exports = postsRoute;
