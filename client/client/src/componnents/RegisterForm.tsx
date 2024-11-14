// src/components/RegisterForm.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./RegisterForm.css";

interface RegisterFormProps {
    onSubmit: (username: string, password: string, organization: string, region: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [organization, setOrganization] = useState("IDF");
    const [region, setRegion] = useState("North");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const regionToSend = organization === "IDF" ? region : "";
        onSubmit(username, password, organization, regionToSend);
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register Page</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="register-input"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="register-input"
                    />
                </div>
                <div className="form-group">
                    <label>Group:</label>
                    <select
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="register-select"
                    >
                        <option value="IDF">IDF</option>
                        <option value="Hezbollah">Hezbollah</option>
                        <option value="Hamas">Hamas</option>
                        <option value="Houthis">Houthis</option>
                        <option value="IRGC">IRGC</option>
                    </select>
                </div>
                {organization === "IDF" && (
                    <div className="form-group">
                        <label>Location:</label>
                        <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className="register-select"
                        >
                            <option value="North">North</option>
                            <option value="South">South</option>
                            <option value="Central">Central</option>
                            <option value="Judea and Samaria">Judea and Samaria</option>
                        </select>
                    </div>
                )}
                <button type="submit" className="register-button">Register</button>
            </form>
            <p className="login-link">
                Already have an account? <Link to="/" className="login-link-text">Click here to login</Link>
            </p>
        </div>
    );
};

export default RegisterForm;
