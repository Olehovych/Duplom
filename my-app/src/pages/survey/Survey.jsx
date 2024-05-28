// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import "./Survey.scss";

const SurveyForm = () => {
  const [questions, setQuestions] = useState([
    {
      text: "",
      options: ["", ""],
      correct: null,
      longAnswer: false,
      longAnswerText: "",
    },
  ]);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].text = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correct = oIndex;
    setQuestions(newQuestions);
  };

  const handleNoCorrectOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correct = null;
    setQuestions(newQuestions);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push("");
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        options: ["", ""],
        correct: null,
        longAnswer: false,
        longAnswerText: "",
      },
    ]);
  };

  const addLongAnswer = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].longAnswer = true;
    newQuestions[qIndex].options = []; // Clear options for long answer type
    newQuestions[qIndex].correct = null; // Clear correct option for long answer type
    setQuestions(newQuestions);
  };

  const handleLongAnswerChange = (qIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].longAnswerText = event.target.value;
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };

  const saveSurvey = () => {
    axios
      .post("http://localhost:5000/api/save", { questions })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error saving the survey!", error);
      });
  };

  return (
    <div className="background">
      <div className="survey-form">
        <h1>Дрогобицький механіко-технологічний коледж</h1>
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="question-block">
            <h3>Завдання {qIndex + 1}</h3>
            <input
              type="text"
              placeholder="Тема завдання ..."
              value={question.text}
              onChange={(event) => handleQuestionChange(qIndex, event)}
            />
            {!question.longAnswer && (
              <>
                <label className="add">Додайте варіанти відповідей</label>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="option-block">
                    <input
                      type="text"
                      placeholder={`Варіант ${oIndex + 1} ...`}
                      value={option}
                      onChange={(event) =>
                        handleOptionChange(qIndex, oIndex, event)
                      }
                    />
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={question.correct === oIndex}
                        onChange={() =>
                          handleCorrectOptionChange(qIndex, oIndex)
                        }
                      />
                      <span className="checkmark"></span>
                      <span>Позначити як правильну відповідь</span>
                    </label>
                  </div>
                ))}
                <button className="addvar" onClick={() => addOption(qIndex)}>
                  Додати варіант
                </button>
                <button
                  className="noSucc"
                  onClick={() => handleNoCorrectOption(qIndex)}
                >
                  Правильна відповідь відсутня
                </button>
              </>
            )}
            {question.longAnswer && (
              <div className="long-answer-block">
                <textarea
                  placeholder="Поле для розгорнутої відповіді ..."
                  rows="4"
                  cols="50"
                  value={question.longAnswerText}
                  onChange={(event) => handleLongAnswerChange(qIndex, event)}
                />
              </div>
            )}
            {!question.longAnswer && (
              <button
                className="BigAnswer"
                onClick={() => addLongAnswer(qIndex)}
              >
                Додати поле для розгорнутої відповіді
              </button>
            )}
            <button
              className="remove-question"
              onClick={() => removeQuestion(qIndex)}
            >
              Видалити завдання
            </button>
          </div>
        ))}
        <div className="flex">
          <button onClick={addQuestion}>ДОДАТИ ЗАПИТАННЯ</button>
          <button onClick={saveSurvey}>Зберегти</button>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
