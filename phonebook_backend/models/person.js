const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("Connecting to MongoDB Atlas server");

mongoose
  .connect(url)
  .then((res) => console.log("MongoDB connected"))
  .catch((error) =>
    console.log("Failed to connect to MongoDB with error", error.message)
  );

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
