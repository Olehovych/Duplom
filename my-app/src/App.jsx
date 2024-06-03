import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage"; // Ваш компонент AdminPage
import TaskPage from "./pages/TaskPage"; // Ваш компонент TaskPage
import Survey from "./pages/survey/Survey";
import Main from "./pages/MainPage/Main";
import SurveyViewer from "./pages/surveyViewer/SurveyViewer";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/SurveyViewer" element={<SurveyViewer />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Survey" element={<Survey />} />
        <Route path="/taskpage" element={<TaskPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
