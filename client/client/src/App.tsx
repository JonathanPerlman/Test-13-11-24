import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage"
import PrivateRoute from "./componnents/PrivateRoute";
import OrganizationPage from "./pages/Organization/OrganizationPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/defends" element={<PrivateRoute><OrganizationPage/></PrivateRoute> } />

      </Routes>
    </Router>
  );
};

export default App;
