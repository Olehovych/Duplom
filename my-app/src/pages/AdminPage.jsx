// AdminPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "../components/TaskList"; // Імпортуємо компонент TaskList

const AdminPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [teacherName, setTeacherName] = useState("");

  useEffect(() => {
    // Загрузка завдань з сервера при завантаженні компонента
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  const handleAddTask = () => {
    const newTask = {
      taskName,
      taskDescription,
      teacherName,
    };

    axios
      .post("http://localhost:5000/tasks", newTask)
      .then((response) => {
        setTasks([...tasks, response.data]);
        setTaskName("");
        setTaskDescription("");
        setTeacherName("");
      })
      .catch((error) => {
        console.error("There was an error adding the task!", error);
      });
  };

  const handleDeleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the task!", error);
      });
  };
  console.log("Tasks in AdminPage:", tasks);

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <div className="task-form">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>
        <input
          type="text"
          placeholder="Teacher Name"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      {/* Передача завдань у компонент TaskList */}
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
    </div>
  );
};

export default AdminPage;
