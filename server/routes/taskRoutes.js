const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// CREATE task
router.post("/", async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Task
router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update task
router.put("/:id", async (req, res) => {
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