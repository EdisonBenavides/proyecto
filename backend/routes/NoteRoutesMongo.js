const express = require('express');
const router = express.Router();
const { saveNoteHandler } = require('../controllers/NoteControllerMongo');

router.post('/save-note-mongo', saveNoteHandler);

module.exports = router;
