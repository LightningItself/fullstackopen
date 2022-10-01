const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

blogSchema.set("toJSON", {
  transform: (document, requestedObject) => {
    requestedObject.id = requestedObject._id.toString();
    delete requestedObject._id;
    delete requestedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
