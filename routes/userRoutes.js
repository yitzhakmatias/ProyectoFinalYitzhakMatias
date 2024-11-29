const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.post('/users', registerUser);
router.post('/login', loginUser);

module.exports = router;