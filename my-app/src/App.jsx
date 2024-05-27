import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Task from "./components/Task"; // Ваш компонент TaskPage або список компонентів Task
import AdminPage from "./pages/AdminPage"; // Ваш компонент AdminPage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Task" element={<Task />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
