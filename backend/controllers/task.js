const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    const task = await Task.create({
        title: req.body.title,
        user: req.user.id
    });

    res.json(task);
};

exports.getTasks = async (req, res) => {
    try {
     
        const userId = req.query.userId || req.user.id;

        const tasks = await Task.find({ user: userId });

        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id // 
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};