import React, { useState, useEffect } from "react";
import axios from "axios";
import "../surveyViewer/SurveyViewer.scss";

const SurveyViewer = () => {
  const [surveys, setSurveys] = useState([]);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/surveys")
      .then((response) => {
        setSurveys(response.data);
        setShowCorrectAnswers(Array(response.data.length).fill(false));
        setUserAnswers(Array(response.data.length).fill(""));
      })
      .catch((error) => {
        console.error("Error fetching surveys:", error);
      });
  }, []);

  const handleCheckAnswer = (surveyIndex, correctIndex) => {
    const correctAnswer =
      surveys[surveyIndex].questions[0].options[correctIndex];
    const updatedShowCorrectAnswers = [...showCorrectAnswers];
    updatedShowCorrectAnswers[surveyIndex] = true;
    setShowCorrectAnswers(updatedShowCorrectAnswers);
  };

  const handleInputChange = (surveyIndex, optionIndex) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[surveyIndex] =
      surveys[surveyIndex].questions[0].options[optionIndex];
    setUserAnswers(updatedUserAnswers);
  };

  return (
    <>
      <h1>Дрогобицький механіко-технологічний фаховий коледж</h1>
      <div className="survey-container">
        <div className="survey-list">
          {surveys.map((survey, surveyIndex) => (
            <div key={surveyIndex} className="survey-item">
              <div className="survey-question">
                <h3>{survey.questions[0].text}</h3>
                <ul className="survey-options">
                  {survey.questions[0].options.map((option, optionIndex) => (
                    <li key={optionIndex}>
                      <label>
                        <input
                          type="radio"
                          name={`question_${surveyIndex}`}
                          value={option}
                          onChange={() =>
                            handleInputChange(surveyIndex, optionIndex)
                          }
                          disabled={showCorrectAnswers[surveyIndex]}
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() =>
                    handleCheckAnswer(
                      surveyIndex,
                      survey.questions[0].correct || 0
                    )
                  }
                  disabled={showCorrectAnswers[surveyIndex]}
                >
                  Перевірити правильну відповідь
                </button>
              </div>
              {showCorrectAnswers[surveyIndex] && (
                <div className="survey-answer">
                  <p>
                    Правильна відповідь:{" "}
                    {survey.questions[0].options[survey.questions[0].correct]}
                  </p>
                  <p>Ваша відповідь: {userAnswers[surveyIndex]}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SurveyViewer;
