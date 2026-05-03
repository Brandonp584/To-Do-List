const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

// CREATE task
router.post("/", auth, async (req, res) => {
    try {
        const task = await Task.create({
            title: req.body.title,
            user: req.user
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
        });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
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