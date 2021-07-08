const router = require('express').Router();
const notes = require('../../db/db.json');
const fs = require('fs');
const path = require('path');

// GET /api/notes
// read the db.json file and return all saved notes as JSON
router.get('/notes', (req, res) => {
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../db/db.json'), "utf8"));
    return res.json(data);
});

// POST /api/notes
// receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you)
router.post('/notes', (req, res) => {
    // add unique id to each post
    req.body.id = Date.now();
    notes.push(req.body);
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(notes));
    res.json("Note saved!");
});

// DELETE /api/notes/:id
// receive a query parameter containing the id of a note to delete
router.delete('/notes/:id', (req, res) => {
    let noteId = req.params.id;
    console.log(noteId);
    let data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../db/db.json'), "utf8"));
    console.log(data);
    data = data.filter(note => note.id != noteId)
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(data));
    res.json(data);
});

module.exports = router;