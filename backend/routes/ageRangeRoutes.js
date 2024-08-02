const express = require('express');
const router = express.Router();
const ageRangeController = require('../controllers/ageRangeController');

router.get('/ages', ageRangeController.getAllAges);

module.exports = router;