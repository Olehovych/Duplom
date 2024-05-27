import React, { useState } from "react";
import "./Modal.scss"; // Не забудьте імпортувати ваш SCSS файл з стилями для модального вікна

const Modal = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [group, setGroup] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Тут можна обробити дані форми, наприклад, надіслати на сервер
    console.log("Submitted data:", { firstName, lastName, group });
    onClose(); // Закрити модальне вікно після надсилання
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">Дані</h2>
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="firstName">Ім'я:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Прізвище:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="group">Група:</label>
            <input
              type="text"
              id="group"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Надіслати
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
