require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("./connection/data");

const SignupRouter = require("./routers/signup");
const LoginRouter = require("./routers/login");
const BodyParser = require("body-parser");
const handbookrouter = require("./routers/handbook");
const resourcerouter = require("./routers/resource");
const mentorrouter = require("./routers/mentor");
const hiringrouter = require("./routers/hiring");
const industryrouter = require("./routers/industrypersonality");
const internshipRouter = require("./routers/internship");
const magazineRouter = require("./routers/magazine");
const collegerouter = require("./routers/college");
const passport = require("passport");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();
require("./config/passport")(passport);
app.use(express.urlencoded({ extended: true }));
const morgan = require("morgan");

// SESSION MIDDLEWARE
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUnitialized: false,
    store: new MongoDBStore({
      mongooseConnection: mongoose.connection,
    }),
    //cookie: { secure: true }
  })
);
// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTION,GET,POST,PUT,PATCH,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.send("Hi,the API is working.");
});

//middlewares
app.use(express.json());

//routers
app.use("/api/users", SignupRouter);
app.use("/api/users", LoginRouter);
app.use("/api/users", handbookrouter);
app.use("/api/users", resourcerouter);
app.use("/api/users", mentorrouter);
app.use("/api/users", hiringrouter);
app.use("api/users", industryrouter);
app.use("/api/admin", internshipRouter);
app.use("/api/admin", magazineRouter);
app.use("/api/admin", collegerouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
