// call in express
const express = require("express");
// needs fs module
const fs = require("fs");
const path = require("path");
const api = require("./routes/index.js");

const PORT = process.env.port || 3001;
const app = express();

const notesRouter = require("./routers/notes");

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/notes", notesRouter);

app.use(express.static("public"));

// TODO: GET /notes should return notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// TODO: GET * should return index.html
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// shows that the app is listening at the port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
