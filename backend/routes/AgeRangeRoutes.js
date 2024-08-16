const express = require('express');
const router = express.Router();
const ageRangeController = require('../controllers/AgeRangeController')

router.get('/ages', ageRangeController.getAllAges);
router.delete('/delete-age/:id', ageRangeController.deleteAgeRange);
router.put('/update-age/:id', ageRangeController.updateAgeRange);
router.post('/create-age', ageRangeController.createAgeRange)

module.exports = router;
