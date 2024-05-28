import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  const handleCompleteTask = (id) => {
    // Тут ви можете додати логіку для відзначення завдання як виконаного
    console.log(`Завдання ${id} виконано`);
  };

  return (
    <div className="task-page">
      <h1>Tasks</h1>
      <TaskList
        tasks={tasks}
        onTaskAction={handleCompleteTask}
        actionLabel="Виконати"
      />
    </div>
  );
};

export default TaskPage;
