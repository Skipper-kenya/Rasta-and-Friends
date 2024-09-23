const { Router } = require("express");
const controlRegister = require("../controller/auth/register");
const controlGetUser = require("../controller/auth/get_user");
//
const router = Router();

router.post("/register", controlRegister);
router.get("/getUser/:id", controlGetUser);

const authRouter = router;

module.exports = authRouter;
