const { Router } = require("express");

const path = require("path");
const multer = require("multer");

//local imports
const controlAddProject = require("../controller/projects/add_project");
const controlGetProjects = require("../controller/projects/get_projects");
const controlAddLike = require("../controller/projects/add_like");
const verifyToken = require("../middleware/verifyToken");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "public/projectImages");
  },
  filename: (req, file, cb) => {
    return cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = Router();

router.post("/addProject", upload.single("image"), controlAddProject);
router.get("/getProjects/:id", controlGetProjects);
router.post("/addLike", controlAddLike);

const projectsRoute = router;

module.exports = projectsRoute;
