const express = require("express");
const router = express.Router();
const analyzeSentimentController = require("../controllers/AnalyzeSentimentController");

router.post("/analyze-sentiment", analyzeSentimentController.analyzeSentiment);

module.exports = router;