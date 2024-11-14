import React from "react";
import RegisterForm from "../../componnents/RegisterForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { registerUser } from "../../store/feathers/authUserSlice";
import { Link } from "react-router-dom";    

const RegisterPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleForm = (username: string, password: string, organization: string, region: string) => {
        const regionToSend = organization === "IDF" ? region : "";
        dispatch(registerUser({ username, password, organization, region: regionToSend }));
    };

    return (
        <div>
            <RegisterForm onSubmit={handleForm} />
        </div>
    );
};


export default RegisterPage;
