const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const { url, title, author, likes } = req.body;
  const token = req.token;
  const user = req.user;
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

blogsRouter.delete("/:id", async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId);
  const token = req.token;
  const user = req.user;
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!decodedToken) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  if (user == null || user._id.toString() !== blog.user._id.toString()) {
    return res.status(401).json({ error: "user does not match with token" });
  }
  await Blog.findByIdAndRemove(blogId);
  res.status(201).end();
});

module.exports = blogsRouter;
