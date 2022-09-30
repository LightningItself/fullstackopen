const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const { url, title, author, userId, likes } = req.body;
  const user = await User.findById(userId);
  if (user == null) {
    res.status(400).json({ error: "user not found" });
  }
  const newBlog = new Blog({
    url: url,
    title: title,
    author: author,
    user: user._id,
    likes: likes,
  });
  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});

module.exports = blogsRouter;
