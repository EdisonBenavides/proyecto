const express = require('express');
const router = express.Router();
const generatePositivePhraseController = require('../controllers/GeneratePositivePhraseController');

router.post('/generate-positive-phrase', generatePositivePhraseController.generatePositivePhrase);

module.exports = router;
