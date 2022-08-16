// call in express
const express = require("express");
// needs fs module
const fs = require("fs");
const path = require("path");
const { clog } = require("./middleware/clog");
const api = require("./routes/index.js");
// uuid npm require
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.port || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// need api tourtes
app.use("/api", api);

app.use(express.static("public"));

// TODO: GET /notes should return notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// TODO: GET * should return index.html
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// TODO: GET /api/notes should read the db.json and return saved notes as JSON
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) {
      console.log(error);
    } else {
      const savedNotes = JSON.parse(data);
      res.json(savedNotes);
    }
  });
});

// TODO: GET /api/notes should receive a new note to save on request body, add to db.json, needs unique id (UUID) npm packages might be able to do this - post not get
app.post("/api/notes", (req, res) => {
  fs.writeFile("./db/db.json", (err, data) => {
    JSON.stringify(note);

    // destructure req body
    const { title, text } = req.body;

    // check that theres data
    if (title && text) {
      const postNote = {
        title,
        text,
      };
    }
  });
});

// BONUS TODO: DELETE /api/notes/:id should receive query param that has id, read all notes from db.json file and remove the note with the id property and then rewrite to db.json

// shows that the app is listening at the port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
