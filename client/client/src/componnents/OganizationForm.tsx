import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

interface Organization {
    name: string;
    resources: {
        name: string;
        amount: number;
    }[];
    budget: number;
};

interface CandidatesListProps {
    organization: Organization;
    isLocation: string;
}


const OrganizationForm: React.FC<CandidatesListProps> = ({ organization, isLocation }) => {

    const [region, setRegion] = useState("North");

    const navigate = useNavigate();
    console.log(organization);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div>
            <header>
                <button onClick={handleLogout}>יציאה</button>
            </header>
            <h2>Organization: {organization.name}</h2>
            <h3>ammunition stock</h3>
            {organization.resources.map((res) => (
                <div key={res.name}>
                    <h3>{res.name} * {res.amount}</h3>
                </div>
            ))}
            {isLocation === "" && (
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
        </div>
    );
};

export default OrganizationForm;
