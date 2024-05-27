const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Отримання всіх завдань
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Створення нового завдання
router.post("/", async (req, res) => {
  const task = new Task({
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription,
    teacherName: req.body.teacherName,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Видалення завдання
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.remove();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
