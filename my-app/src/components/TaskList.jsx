import React, { useState } from "react";
import Task from "../components/Task"; // Імпортуємо компонент Task
import Pagination from "./Pagination/Pagination"; // Імпортуємо компонент пагінації

const TaskList = ({ tasks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  // Обчислюємо індекси завдань для поточної сторінки
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="task-list">
      {currentTasks.map((task, index) => (
        <Task
          key={index}
          taskName={task.taskName}
          taskDescription={task.taskDescription}
          teacherName={task.teacherName}
          initialCompleted={task.completed}
          createdAt={task.createdAt}
        />
      ))}

      {/* Пагінація */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TaskList;
