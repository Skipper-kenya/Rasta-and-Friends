const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const controlUploadProfile = require("../controller/profile/upload_profile");
const controlGetProfile = require("../controller/profile/getProfile");
const controlUpdateProfile = require("../controller/profile/update_profile");
const controlDeleteProject = require("../controller/profile/delete_profile");
const verifyToken = require("../middleware/verifyToken");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "public/profileimages");
  },
  filename: (req, file, cb) => {
    return cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = Router();

//controller logic

router.post(
  "/uploadProfile",
  upload.single("image"),
  controlUploadProfile
);
router.get("/getProfile/:id",  controlGetProfile);
router.post("/updateProfile",  controlUpdateProfile);
router.post("/deleteProfile",  controlDeleteProject);

const profileRoute = router;

module.exports = profileRoute;
