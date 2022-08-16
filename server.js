// call in express
const express = require("express");
// needs fs module
const fs = require("fs");
const path = require("path");
// uuid npm require
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.port || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// TODO: GET /api/notes should receive a new note to save on request body, add to db.json, needs unique id (UUID) npm packages might be able to do this
// post not get -- check activity 18
app.post("/api/notes", (req, res) => {
  // destructure req body
  const { title, text } = req.body;

  // check that theres data, add id
  if (title && text) {
    const postNote = {
      title,
      text,
      id: uuidv4(),
    };
    // from mini project
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        var parsedData = JSON.parse(data);
        parsedData.push(postNote);
        fs.writeFile("./db/db.json", JSON.stringify(parsedData), (err) =>
          err ? console.error(err) : console.info(`\nData written to db.json`)
        );
      }
    });
  }
});

// BONUS TODO: DELETE /api/notes/:id should receive query param that has id, read all notes from db.json file and remove the note with the id property and then rewrite to db.json

// shows that the app is listening at the port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
