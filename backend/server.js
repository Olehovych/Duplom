const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Підключення до MongoDB
mongoose
  .connect("mongodb://localhost:27017/tasksdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Схема для завдань
const taskSchema = new mongoose.Schema({
  taskName: String,
  taskDescription: String,
  teacherName: String,
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);

// Схема для опитувань
const surveySchema = new mongoose.Schema({
  questions: [
    {
      text: String,
      options: [String],
      correct: Number,
      longAnswer: Boolean,
      longAnswerText: String,
    },
  ],
});

const Survey = mongoose.model("Survey", surveySchema);

// Маршрути для завдань
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/tasks", async (req, res) => {
  const { taskName, taskDescription, teacherName } = req.body;
  const newTask = new Task({ taskName, taskDescription, teacherName });
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

// Маршрути для опитувань
app.post("/api/save", async (req, res) => {
  const { questions } = req.body;
  const newSurvey = new Survey({ questions });
  try {
    await newSurvey.save();
    res.status(201).json(newSurvey);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/surveys", async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.json(surveys);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
