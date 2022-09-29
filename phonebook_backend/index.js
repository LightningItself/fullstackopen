const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Person = require("./models/person");
require("dotenv").config();

const url = process.env.MONGODB_URI;

console.log("Connecting to MongoDB Atlas server");
mongoose
  .connect(url)
  .then((res) => console.log("MongoDB connected"))
  .catch((error) =>
    console.log("Failed to connect to MongoDB with error", error.message)
  );

app.use(express.json());
const requestLogger = (req, res, next) => {
  console.log("Method: ", req.method);
  console.log("Path: ", req.path);
  console.log("Body:", req.body);
  console.log("---");
  next();
};
app.use(requestLogger);
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get("/api/persons", async (req, res) => {
  const persons = await Person.find({});
  res.json(persons);
});

app.get("/api/persons/:id", async (req, res, next) => {
  try {
    const person = await Person.findOne({
      _id: mongoose.Types.ObjectId(req.params.id),
    });
    res.json(person);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:id", async (req, res) => {
  const personId = req.params.id;
  await Person.deleteOne({ _id: mongoose.Types.ObjectId(personId) });
  res.status(204).end();
});

app.post("/api/persons", async (req, res) => {
  body = req.body;
  const newPerson = {
    name: body.name,
    number: body.number,
  };
  existingPerson = await Person.findOne({ name: newPerson.name });
  console.log(existingPerson);
  if (existingPerson !== null) {
    res.status(400).json({ error: "Person already exists" });
  } else if (newPerson.name !== "" && newPerson.number !== "") {
    const person = new Person({ ...newPerson });
    person.save().then((result) => res.json(newPerson));
  } else {
    res.status(400).json({ error: "Name or number missing" });
  }
});

app.put("/api/persons/:id", async (req, res) => {
  const body = req.body;
  const filter = { _id: mongoose.Types.ObjectId(req.params.id) };
  const update = { number: body.number };
  if (body.number) {
    const response = await Person.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(204).end();
  } else {
    res.status(400).end();
  }
});

const errorHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err.name == "BSONTypeError") {
    return res.status(400).send({ error: "malformatted id" });
  }
  next(err);
};

app.use(errorHandler);

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown Endpoint" });
};
app.use(unknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
