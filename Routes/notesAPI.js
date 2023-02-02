const router = require("express").Router();
const fs = require("fs");
// For random ID
const uuid = require("uuid");

// Sends db.json for adding to HTML page list
router.get("/api/notes", (req, res) =>
  fs.readFile("./db/db.json", (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  })
);

router.post("/api/notes", (req, res) => {
  const note = JSON.parse(fs.readFileSync("./db/db.json"));
  // Adds new note by reading the request body
  const addNotes = req.body;
  // Adds random ID to note
  addNotes.id = uuid.v4();
  note.push(addNotes);
  fs.writeFileSync("./db/db.json", JSON.stringify(note));
  res.json(note);
});


module.exports = router;