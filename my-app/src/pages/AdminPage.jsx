// AdminPage.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "../components/TaskList";
import Modal from "../components/ModalAdmin/Modal";
import "./AdminPage.scss";

const AdminPage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAddTask = () => {
    const newTask = {
      taskName,
      taskDescription,
      teacherName,
      createdAt: new Date().toISOString(),
    };

    axios
      .post("http://localhost:5000/tasks", newTask)
      .then((response) => {
        setTasks([...tasks, response.data]);
        setTaskName("");
        setTaskDescription("");
        setTeacherName("");
        setIsModalOpen(false);
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

  const handleModalSubmit = (data) => {
    // Отримані дані можна використовувати тут для подальшої обробки
    console.log("Data from modal:", data);
    // Наприклад, оновлення стану або відправка на сервер
  };

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <button className="add-task-button" onClick={() => setIsModalOpen(true)}>
        Додати завдання
      </button>

      <TaskList
        tasks={tasks}
        onTaskAction={handleDeleteTask}
        actionLabel="Видалити"
        isAdminPage={true}
      />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        >
          <div className="task-form">
            <input
              type="text"
              placeholder="Заголовок"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <textarea
              placeholder="Опис"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            ></textarea>
            <input
              type="text"
              placeholder="Ім'я Викладача"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
            />
            <button onClick={handleAddTask}>Опублікувати</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminPage;
