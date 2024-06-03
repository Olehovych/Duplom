// Task.js
import React, { useState } from "react";
import Modal from "./Modal/Modal";
import LoginModal from "./LoginModal/Modal";
import "./Task.scss";

const Task = ({ task, onTaskAction, actionLabel, isAdminPage }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleExecuteButtonClick = () => {
    setModalOpen(true);
  };

  const handleModalSubmit = (data) => {
    console.log("Data from modal:", data);
    // Отримані дані можна використовувати тут для подальшої обробки, наприклад, відправити на сервер або оновити стан компонента
  };

  return (
    <div
      className="task-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`task ${isHovered ? "hovered" : ""}`}>
        <div className="title">
          <h3 className={task.completed ? "completed" : ""}>{task.taskName}</h3>
          <button
            className={`toggle-button ${
              isAdminPage ? "admin-page-button" : ""
            }`}
            onClick={() => {
              if (isAdminPage) {
                onTaskAction(task._id);
              } else {
                setModalOpen(true);
              }
            }}
          >
            {actionLabel}
          </button>
        </div>

        <div className="task-info">
          <div className="info">
            <p>{task.taskDescription}</p>
            <div>
              <em>Teacher: {task.teacherName}</em>
              <div>Created at: {new Date(task.createdAt).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default Task;
