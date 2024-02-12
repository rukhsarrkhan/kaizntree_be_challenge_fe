import { useState } from "react";
import { signupFields } from "../constants/formField";
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import React from "react";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

let validationErrorsState = {};
fields.forEach((field) => (validationErrorsState[field.id + "Error"] = ""));

export default function Signup() {
    const navigate = useNavigate();

    const [signupState, setSignupState] = useState(fieldsState);
    const [loginError, setLoginError] = useState('');
    const [errors, setErrors] = useState(validationErrorsState);

    const validateFields = () => {
        let isValid = true;
        let errors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(signupState.email)) {
            errors.emailError = "Invalid email format.";
            isValid = false;
        }

        if (signupState.password.length < 8) {
            errors.passwordError = "Password must be at least 8 characters.";
            isValid = false;
        }

        const passwordComplexityRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;
        if (!passwordComplexityRegex.test(signupState.password)) {
            errors.passwordError = "Password must contain both letters and numbers.";
            isValid = false;
        }

        if (signupState.password !== signupState.password2) {
            errors.password2Error = "Passwords do not match.";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            console.log(signupState);
            createAccount();
        }
    };

    //handle Signup API Integration here
    const createAccount = () => {
        const endpoint = `http://127.0.0.1:8000/api/v1/auth/register/`;
        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signupState),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                navigate("/login");
            })
            .catch((error) => {
                console.log('Signup failed:', error.message);
                // Optionally, inform the user about the login failure and suggest next steps
                // For example, updating the state to show an error message on the UI
                setLoginError('Signup failed: Incorrect email or password.');

            });

    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {fields.map((field) => (
                    <React.Fragment key={field.id}>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                        {errors[field.id + "Error"] && <p className="text-red-500">{errors[field.id + "Error"]}</p>}
                    </React.Fragment>
                ))}
            </div>
            {loginError && <div className="text-red-500 text-sm mt-2">{loginError}</div>}
            <FormAction handleSubmit={handleSubmit} text="Signup" />

        </form>
    );
}