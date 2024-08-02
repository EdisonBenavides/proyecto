const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getAllUsers)
router.post('/validate-user', userController.validateUserCredentials)
router.post('/create-user', userController.createUser)

module.exports = router;