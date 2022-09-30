const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (req, res) => {
  const users = await await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const checkFormat = async ({ username, name, password }) => {
    if (name == "" || username == "" || password == "") {
      return false;
    }
    if (name.length < 3 && username.length < 3) {
      return false;
    }
    return true;
  };
  const newUser = new User({
    name: name,
    username: username,
    password: passwordHash,
  });
  console.log(await checkFormat({ username, name, password }));
  if (await checkFormat({ username, name, password })) {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } else {
    res.status(400).json({ error: "bad request" });
  }
});

module.exports = usersRouter;
