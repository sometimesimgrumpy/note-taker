// https://www.youtube.com/watch?v=SccSCuHhOw0 - help with routes
const express = require("express");
const router = express.Router();
// uuid npm require
const { v4: uuidv4 } = require("uuid");
// utils from mini project
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helpers/utils");

// app.use("./routers/notes", notesRouter);

// TODO: GET /api/notes should read the db.json and return saved notes as JSON
router.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// TODO: GET /api/notes should receive a new note to save on request body, add to db.json, needs unique id (UUID) npm packages might be able to do this
// post not get -- check activity 18
router.post("/", (req, res) => {
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
    readAndAppend(postNote, "./db/db.json");

    const response = {
      status: "success",
      body: postNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting feedback");
  }
});

// get specific notes - from mini project
router.get("/:id", (req, res) => {
  const notesId = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === notesId);
      return result.length > 0
        ? res.json(result)
        : res.json("No note with that ID");
    });
});

// BONUS TODO: DELETE /api/notes/:id should receive query param that has id, read all notes from db.json file and remove the note with the id property and then rewrite to db.json - check mini project
router.delete(":id", (req, res) => {
  const notesId = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== notesId);

      // Save that array to the filesystem
      writeToFile("./db/db.json", result);

      // Respond to the DELETE request
      res.json(`Item ${notesId} has been deleted 🗑️`);
    });
});

module.exports = router;
