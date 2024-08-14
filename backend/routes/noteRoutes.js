const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

router.post('/save-note', noteController.saveNote)
router.get('/get-user-notes', noteController.getUserNotes)
router.delete('/delete-note', noteController.deleteNote);
router.put('/update-note/:noteId', noteController.updateNote);

module.exports = router;