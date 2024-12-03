const express = require('express');
const { registerUser, loginUser, getUserById, updateUser, updateUserStatus, deleteUser, getAllUsers } = require('../controllers/userController');
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: User's username
 *         password:
 *           type: string
 *           description: User's password
 *         status:
 *           type: string
 *           description: User's status (active/inactive)
 *       example:
 *         id: 1
 *         username: johndoe
 *         password: mypassword
 *         status: active
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', getAllUsers);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully.
 */
router.post('/users', registerUser);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: johndoe
 *               password: mypassword
 *     responses:
 *       200:
 *         description: Login successful, returns a JWT.
 *       401:
 *         description: Unauthorized.
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags: [User]
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
 *         description: User found.
 *       404:
 *         description: User not found.
 */
router.get('/users/:id', verifyToken, getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       404:
 *         description: User not found.
 */
router.put('/users/:id', verifyToken, updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update a user's status
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: active
 *     responses:
 *       200:
 *         description: User status updated.
 *       404:
 *         description: User not found.
 */
router.patch('/users/:id', verifyToken, updateUserStatus);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
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
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 */
router.delete('/users/:id', verifyToken, deleteUser);

module.exports = router;
