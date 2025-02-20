
const express = require("express");
const cors = require("cors");
//
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
//local
const authRouter = require("./routes/auth");
const dbConnection = require("./db.config.js");
//
//
const port = require("./config");
const passport = require("passport");
const controlLogin = require("./controller/auth/login.js");
const profileRoute = require("./routes/profile.js");
const projectsRoute = require("./routes/projects.js");
//

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

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoDBStore({
      uri: process.env.MONGO_URI,
    }),
    cookie: {
      secure: true,
      // httpOnly: true,
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
