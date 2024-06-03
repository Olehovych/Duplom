import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../LoginModal/Modal.scss";

const LoginModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      navigate("/admin");
      onClose();
    } else {
      alert("Invalid login credentials");
    }
  };

  return (
    isOpen && (
      <div className="login-modal">
        <div className="login-modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Адмін</h2>
          <div className="form-group">
            <label htmlFor="lastName">Логін</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Вхід</button>
        </div>
      </div>
    )
  );
};

export default LoginModal;
