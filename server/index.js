const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
//local
const authRouter = require("./routes/auth");
const dbConnection = require("./db.config.js");
const port = require("./config");
const passport = require("passport");
const controlLogin = require("./controller/auth/login.js");
const profileRoute = require("./routes/profile.js");
const projectsRoute = require("./routes/projects.js");
const notificationsRoute = require("./routes/notifications.js");
const postsRoute = require("./routes/posts.js");
require("dotenv").config();

const app = express();
app.use(express.static("public"));

app.use(
  cors({
    origin: process.env.CLIENT_URI,
    methods: ["POST", "GET", "DELETE", "UPDATE"],
    credentials: true,
  })
);

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'Set-Cookie');
  next();
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
      uri: process.env.MONGO_URI,
    }),
    cookie: {
      sameSite: "none",
      domain: process.env.CLIENT_URI,
      secure: true,
      path: "/",
      maxAge: 3600000, //1hr
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

app.use("/auth", authRouter);
app.use("/auth", controlLogin);
app.use("/api", profileRoute);
app.use("/api", projectsRoute);
app.use("/api", notificationsRoute);
app.use("/api", postsRoute);

dbConnection(() => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
