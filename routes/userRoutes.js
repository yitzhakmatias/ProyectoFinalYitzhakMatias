const express = require('express');
const { registerUser, loginUser, getUserById, updateUser, updateUserStatus, deleteUser, getAllUsers} = require('../controllers/userController');
const {verifyToken} = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/users', registerUser);
router.post('/login', loginUser);
router.post('/users', registerUser);
router.post('/login', loginUser);
router.get('/users/:id', verifyToken, getUserById);
router.put('/users/:id', verifyToken, updateUser);
router.patch('/users/:id', verifyToken, updateUserStatus);
router.delete('/users/:id', verifyToken, deleteUser);
router.get('/users', getAllUsers);
module.exports = router;
