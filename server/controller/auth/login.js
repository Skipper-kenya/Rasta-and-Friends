const { Router } = require("express");
const userModel = require("../../models/user.js");
const bcrypt = require("bcryptjs");
const router = Router();

const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await userModel.findOne({ username });

      if (!user) {
        return done(null, false, { message: "no user found" });
      }

      const correctPassword = await bcrypt.compare(password, user.password);

      !correctPassword
        ? done(null, false, { message: "incorrect password" })
        : done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
  const getUser = await userModel.findById({ _id });
  return done(null, getUser);
});

router.get("/auth/failure", (req, res) => {
  console.log("request failed");
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    err ? next(err) : null;

    if (!user) {
      return res.send({ success: false, message: info.message });
    }

    req.logIn(user, (err) => {
      user.password = "";
      err
        ? next(err)
        : res.status(200).json({
            success: true,
            message: "Authentication successful...",
            user,
            isAuthenticated: req.isAuthenticated(),
          });
    });
  })(req, res, next);
});

router.delete("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.send({ success: true });
  });
});

const controlLogin = router;

module.exports = controlLogin;
