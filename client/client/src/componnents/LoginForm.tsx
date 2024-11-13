// src/components/LoginForm.tsx
import React, { FC, FormEvent, useState } from "react";

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
    <form onSubmit={handleForm}>
      <input
        type="text"
        placeholder="Name"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit">כניסה</button>
    </form>

    
  );
};

export default LoginForm;
