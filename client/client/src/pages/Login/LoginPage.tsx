// src/pages/Login/LoginPage.tsx
import React from "react";
import LoginForm from "../../componnents/LoginForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { loginUser } from "../../store/feathers/authUserSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 

  const handleForm = async (username: string, password: string) => {
    
    const response = await dispatch(loginUser({ username, password }));
    
    navigate("/defends")
  };

  return (
    <div>
      <LoginForm onSubmit={handleForm} />
    </div>
  );
};

export default LoginPage;
