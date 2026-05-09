const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

// CREATE task
router.post("/", auth, async (req, res) => {
    try {
        const taskCount = await Task.countDocuments({
        user: req.user
    });

    const task = await Task.create({
        title: req.body.title,
        priority: req.body.priority || "medium",
        user: req.user,
        order: taskCount
    });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all tasks
router.get("/", auth, async (req, res) => {
    try {
        const tasks = await Task.find({ 
            user: req.user 
        }).sort({ order: 1});
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Reorder Tasks
router.put("/reorder", auth, async (req, res) => {
    try {
        const { tasks } = req.body;

        await Promise.all(
            tasks.map(task =>
               Task.updateOne(
                    {
                        _id: task.id,
                        user: req.user
                    },
                    {
                        $set: {
                            order: task.order
                        }
                    }
                )
            )
        );

        res.json({
            message: "Task order updated!"
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// Delete Task
router.delete("/:id", auth, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update task
router.put("/:id", auth, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;