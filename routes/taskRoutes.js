const express = require('express');
const { getTasks, createTask, getTaskById, updateTask, deleteTask, updateTaskStatus, getUserTasks} = require('../controllers/taskController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(verifyToken);

router.post('/tasks', createTask);
router.get('/tasks', verifyToken, getTasks);
router.post('/tasks', verifyToken, createTask);
router.get('/tasks/:id', verifyToken, getTaskById);
router.put('/tasks/:id', verifyToken, updateTask);
router.patch('/tasks/:id', verifyToken, updateTaskStatus);
router.delete('/tasks/:id', verifyToken, deleteTask);
router.get('/users/:id/tasks', verifyToken, getUserTasks);
module.exports = router;
