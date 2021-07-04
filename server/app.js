const mongoose = require("mongoose");
const logger = require("morgan");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const User = require("./user");

mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoose connected"));

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "whateverdude",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("whateverdude"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("User not found");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("User authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, user) => {
    if (!err) {
      if (!user) {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          username: req.body.username,
          password: hashPassword,
        });

        await newUser.save();
        res.send("User created");
      } else {
        res.send("User already exists");
      }
    } else {
      res.send(err);
    }
  });
});

app.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("You got me bitch");
  } else {
    res.send("Not this time");
  }
});

app.get("/logout", (req, res) => {
  req.logOut();
  res.send("User logout");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
