import React, { FC, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "./LoginForm.css";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleForm} className="login-form">
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="register-link">
        If you're not registered, <Link to="/register">click here to register</Link>
      </p>
    </div>
  );
};

export default LoginForm;
