const express = require('express');
const { getTasks, createTask, getTaskById } = require('../controllers/taskController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks for the logged-in user
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks.
 *       401:
 *         description: Unauthorized.
 */
router.get('/tasks', verifyToken, getTasks);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             example:
 *               name: Complete Swagger integration
 *     responses:
 *       201:
 *         description: Task created successfully.
 *       401:
 *         description: Unauthorized.
 */
router.post('/tasks', verifyToken, createTask);

module.exports = router;
