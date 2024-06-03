import React from "react";
import "./Main.scss";
import Logo from "../../../img/logo.png";
import { Link } from "react-router-dom";
function Main() {
  return (
    <div className="main">
      <header className="header">
        <a href="https://dmtc.org.ua/" className="logo">
          <img src={Logo} alt="Logo" />
        </a>
        <h1>Дрогобицький механіко-технологічний фаховий коледж</h1>
      </header>
      <main className="main-content">
        <div className="survey-section">
          <h2>Опитувальник для студентів ДМТФК</h2>
          <div className="buttons">
            <Link to="/survey">
              <button>Створити опитування</button>
            </Link>
            <Link to="/SurveyViewer">
              <button>Пройти опитування</button>
            </Link>
          </div>
          <div className="buttons">
            <Link to="/taskpage">
              <button id="task-btn">Завдання </button>
            </Link>
          </div>
        </div>
        <div className="info-section">
          <ul>
            <li>
              <span className="dot yellow"></span>
              <span>Опитування:</span>
              <p>Питання в поля різних типів</p>
            </li>
            <li>
              <span className="dot yellow"></span>
              <span>Голосування:</span>
              <p>Одне питання та багато відповідей</p>
            </li>
            <li>
              <span className="dot yellow"></span>
              <span>Тести:</span>
              <p>Можливість створити або проходити тести</p>
            </li>
          </ul>
        </div>
      </main>
      <footer className="footer">
        <address>
          Дрогобич, вул. Раневицька 12
          <br />
          (03244)3-52-06
          <br />
          monudmt@ukr.ne
        </address>
      </footer>
    </div>
  );
}

export default Main;
