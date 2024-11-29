const express = require('express');
const { getTasks, createTask } = require('../controllers/taskController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(verifyToken);

router.get('/tasks', getTasks);
router.post('/tasks', createTask);

module.exports = router;
