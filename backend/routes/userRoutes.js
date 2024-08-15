const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getAllUsers)
router.post('/validate-user', userController.validateUserCredentials)
router.post('/create-user', userController.createUser)
router.delete('/delete-user/:id', userController.deleteUser);
router.put('/update-user/:id', userController.updateUser);

module.exports = router;