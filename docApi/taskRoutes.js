const express = require('express');
const { getTasks, createTask, getTaskById, updateTask, deleteTask, updateTaskStatus, getUserTasks } = require('../controllers/taskController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - name
 *         - userId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the task
 *         name:
 *           type: string
 *           description: The task's name
 *         done:
 *           type: boolean
 *           description: Completion status of the task
 *         userId:
 *           type: integer
 *           description: The ID of the user who owns the task
 *       example:
 *         id: 1
 *         name: Complete the project
 *         done: false
 *         userId: 1
 */

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
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully.
 */
router.post('/tasks', verifyToken, createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task details.
 *       404:
 *         description: Task not found.
 */
router.get('/tasks/:id', verifyToken, getTaskById);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update task details
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated successfully.
 */
router.put('/tasks/:id', verifyToken, updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     summary: Update task status
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
 *               done:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Task status updated.
 */
router.patch('/tasks/:id', verifyToken, updateTaskStatus);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 */
router.delete('/tasks/:id', verifyToken, deleteTask);

/**
 * @swagger
 * /api/users/{id}/tasks:
 *   get:
 *     summary: Get all tasks for a specific user
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of tasks for a user.
 */
router.get('/users/:id/tasks', verifyToken, getUserTasks);

module.exports = router;
