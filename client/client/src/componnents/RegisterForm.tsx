import React, { useState } from "react";

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
        console.log({ username, password, organization, region: regionToSend });
        onSubmit(username, password, organization, regionToSend);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label>Group:</label>
                <select value={organization} onChange={(e) => setOrganization(e.target.value)}>
                    <option value="IDF">IDF</option>
                    <option value="Hezbollah">Hezbollah</option>
                    <option value="Hamas">Hamas</option>
                    <option value="Houthis">Houthis</option>
                    <option value="IRGC">IRGC</option>
                </select>
            </div>
            {organization === "IDF" && (
                <div>
                    <label>Location:</label>
                    <select value={region} onChange={(e) => setRegion(e.target.value)}>
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="Central">Central</option>
                        <option value="Judea and Samaria">Judea and Samaria</option>
                    </select>
                </div>
            )}
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
