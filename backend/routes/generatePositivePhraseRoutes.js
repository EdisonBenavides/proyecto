const express = require('express');
const router = express.Router();
const generatePositivePhraseController = require('../controllers/generatePositivePhraseController');

router.post('/generate-positive-phrase', generatePositivePhraseController.generatePositivePhrase);

module.exports = router;