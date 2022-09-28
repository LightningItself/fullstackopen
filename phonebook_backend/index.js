const express = require("express");
const cors = require("cors");
const app = express();

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

const PORT = 3001;

let db = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "IG",
    number: "39-23-6423122",
    id: 5,
  },
];

app.get("/api/persons", (req, res) => {
  res.json(db);
});

app.get("/api/persons/:id", (req, res) => {
  const person = db[req.params.id - 1];
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const person = db[req.params.id - 1];
  if (person) {
    db = db.filter((entry) => entry.id !== person.id);
    res.status(204).end();
  } else {
    console.log("person already removed");
    res.status(400).json({ error: "id not found" });
  }
});

app.post("/api/persons", (req, res) => {
  body = req.body;
  const newPerson = {
    name: body.name,
    number: body.number,
    id: db.length + 1,
  };

  if (db.find((person) => person.name === newPerson.name)) {
    res.status(400).json({ error: "Person already exists" });
  }
  if (newPerson.name !== "" && newPerson.number !== "") {
    db = db.concat(newPerson);
    res.json(newPerson);
  } else {
    res.status(400).json({ error: "Name or number missing" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
