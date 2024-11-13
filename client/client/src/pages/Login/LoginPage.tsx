// src/pages/Login/LoginPage.tsx
import React from "react";
import LoginForm from "../../componnents/LoginForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { loginUser } from "../../store/feathers/authUserSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  
  const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate(); 

  const handleForm = async (username: string, password: string) => {
    
    const response = await dispatch(loginUser({ username, password }));
    
  };

  return (
    <div>
      <h2>Login Page</h2>
      <LoginForm onSubmit={handleForm} />
      <div>
        <p>If you're not registered, <Link to="/register">click here to register</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
