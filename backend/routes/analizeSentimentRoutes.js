const express = require("express");
const router = express.Router();
const analyzeSentimentController = require("../controllers/analyzeSentimentController");

router.post("/analyze-sentiment", analyzeSentimentController.analyzeSentiment);

module.exports = router;