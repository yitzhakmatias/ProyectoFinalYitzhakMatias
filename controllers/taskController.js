const { Task , User} = require('../models');

// Fetch all tasks for the logged-in user
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.id } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

// Create a new task
const createTask = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Task name is required' });
        }

        const newTask = await Task.create({ name, userId: req.user.id, done: false });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};

// Fetch a task by ID (protected)
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ where: { id, userId: req.user.id } });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching task', error });
    }
};

// Update task details
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const task = await Task.findOne({ where: { id, userId: req.user.id } });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.name = name || task.name;
        await task.save();

        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOne({ where: { id, userId: req.user.id } });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.destroy();
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};
// Update task status
const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { done } = req.body;

        const task = await Task.findByPk(id);

        if (!task) return res.status(404).json({ message: 'Task not found' });

        await task.update({ done });
        res.status(200).json({ message: 'Task status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating task status', error });
    }
};
// Get tasks for a specific user
const getUserTasks = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the user exists
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch tasks associated with the user
        const tasks = await Task.findAll({ where: { userId: id } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};
module.exports = {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    updateTaskStatus,
    getUserTasks
};
