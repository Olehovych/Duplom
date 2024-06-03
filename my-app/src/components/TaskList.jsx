// TaskList.js
import React, { useState } from "react";
import Task from "../components/Task"; // Імпортуємо компонент Task
import Pagination from "./Pagination/Pagination"; // Імпортуємо компонент пагінації
import LoginModal from "./LoginModal/Modal"; // Імпортуємо модальне вікно для логіну

const TaskList = ({ tasks, onTaskAction, actionLabel, isAdminPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const tasksPerPage = 6;

  const handleLoginButtonClick = () => {
    setLoginModalOpen(true);
  };

  // Обчислюємо індекси завдань для поточної сторінки
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="task-list-container">
      {!isAdminPage && (
        <button className="login-button" onClick={handleLoginButtonClick}>
          Адміністратор
        </button>
      )}
      <div className="task-list">
        {currentTasks.map((task) => (
          <Task
            key={task._id}
            task={task}
            onTaskAction={onTaskAction}
            actionLabel={actionLabel}
            isAdminPage={isAdminPage}
          />
        ))}
      </div>
      {/* Пагінація */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
};

export default TaskList;
