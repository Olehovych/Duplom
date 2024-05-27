import React, { useState } from "react";
import Modal from "./Modal/Modal"; // Шлях до вашого компонента модального вікна
import "./Task.scss"; // Імпортуємо SCSS файл

const Task = ({
  taskName,
  taskDescription,
  teacherName,
  initialCompleted,
  createdAt,
  tasks, // Додайте цю властивість
}) => {
  const [completed, setCompleted] = useState(initialCompleted);
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <div
      className="task-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`task ${isHovered ? "hovered" : ""}`}>
        <div className="title">
          <h3 className={completed ? "completed" : ""}>{taskName}</h3>

          <button className="toggle-button" onClick={() => setModalOpen(true)}>
            Виконати
          </button>
        </div>

        <div className="task-info">
          <div className="info">
            <p>{taskDescription}</p>
            <div>
              <em>Teacher: {teacherName}</em>
              <div>Created at: {createdAt}</div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Task;
