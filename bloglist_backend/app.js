const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
require("express-async-errors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

module.exports = app;
