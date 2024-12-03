const { User,Task } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword, status: 'active' });

        res.status(201).json({ message: 'User created successfully', userId: newUser.id });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login user and generate token
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Fetch a user by ID (protected)
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};
// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Update user details
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;
        const user = await User.findByPk(id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        const hashedPassword = password ? await bcrypt.hash(password, 10) : user.password;

        await user.update({ username, password: hashedPassword });
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Update user status
const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['active', 'inactive'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const user = await User.findByPk(id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.update({ status });
        res.status(200).json({ message: 'User status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user status', error });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

// Get tasks for a specific user
const getUserTasks = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, { include: Task });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user.Tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};
module.exports = {
    registerUser,
    loginUser,
    getUserById,
    getAllUsers,
    updateUser,
    updateUserStatus,
    deleteUser,
    getUserTasks
};
