const verifyToken = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res
      .status(401)
      .send({ success: false, message: "please login first" });
  }
};

module.exports = verifyToken;
