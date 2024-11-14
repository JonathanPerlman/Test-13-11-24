import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAttackData } from '../store/feathers/Attack';
import { AppDispatch } from '../store/store';
import "./OganizationForm.css"

export interface Organization {
    name: string;
    resources: {
        name: string;
        amount: number;
    }[];
    budget: number;
}

export interface CandidatesListProps {
    organization: Organization;
    isLocation: string;
}

interface MissileData {
    name: string;
    speed: number;
    status: string;
}

const OrganizationForm: React.FC<CandidatesListProps> = ({ organization, isLocation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [region, setRegion] = useState("North");
    const navigate = useNavigate();
    const [missileData, setMissileData] = useState<MissileData[]>([]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleMissileClick = async (missileName: string) => {
        try {
            const result = await dispatch(getAttackData({name: missileName })).unwrap();
            setMissileData((prevData) => {
                return [...prevData, result[0]];
            });
        } catch (error) {
            console.error("Error fetching missile data:", error);
        }
    };

    return (
        <div className="organization-container">
            <header>
                <button onClick={handleLogout} className="logout-button">logout</button>
            </header>
            <h2 className="organization-title">Organization: {organization.name}</h2>

            {isLocation === "" && (
                <div className="form-group">
                    <label className="location-label">Location:</label>
                    <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="select-region"
                    >
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="Central">Central</option>
                        <option value="Judea and Samaria">Judea and Samaria</option>
                    </select>
                </div>
            )}

            <h3>ammunition stock</h3>
            <div className="resources-list">
                {organization.resources.map((res) => (
                    <div
                        key={res.name}
                        className="resource-item"
                        onClick={() => handleMissileClick(res.name)}
                    >
                        <h3>{res.name} * {res.amount}</h3>
                    </div>
                ))}
            </div>

            {missileData.length > 0 && (
                <table className="missile-table">
                    <thead>
                        <tr>
                            <th>Rocket</th>
                            <th>Time to Hit</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {missileData.map((missile, index) => (
                            <tr key={index}>
                                <td>{missile.name}</td>
                                <td>{missile.speed}</td>
                                <td>{missile.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrganizationForm;
