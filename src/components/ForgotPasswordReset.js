import { useState } from "react";
import { passwordResetFields } from "../constants/formField";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate, useParams } from "react-router-dom";

const fields = passwordResetFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));
let apiKey = "bjkabfk";

export default function ForgotPasswordReset() {
    const navigate = useNavigate();
    const { uidb64, token } = useParams();

    const [forgotPasswordState, setForgotPasswordState] = useState(fieldsState);
    const [loginError, setLoginError] = useState('');
    const [errors, setErrors] = useState({});

    const validateFields = () => {
        let isValid = true;
        let newErrors = {};

        if (forgotPasswordState.password.length < 8) {
            newErrors.passwordError = "Password must be at least 8 characters.";
            isValid = false;
        }

        const passwordComplexityRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;
        if (!passwordComplexityRegex.test(forgotPasswordState.password)) {
            newErrors.passwordError = "Password must contain both letters and numbers.";
            isValid = false;
        }
        console.log(forgotPasswordState.password);
        console.log(forgotPasswordState);
        if (forgotPasswordState.password !== forgotPasswordState.confirm_password) {
            newErrors.passwordError = "Passwords do not match.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        setForgotPasswordState({ ...forgotPasswordState, [e.target.id]: e.target.value });
        setErrors({ ...errors, [e.target.id + "Error"]: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            resetPassword();
        }
    };

    //Handle Reset Password API Integration here
    const resetPassword = () => {
        const endpoint = `http://127.0.0.1:8000/api/v1/auth/set-new-password/`;

        const formData = new FormData();
        formData.append("password", forgotPasswordState.password);
        formData.append("confirm_password", forgotPasswordState.confirm_password);
        formData.append("uidb64", uidb64);
        formData.append("token", token);

        fetch(endpoint, {
            method: "PATCH",
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // },
            body: formData,
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
                console.log("Password Reset failed:", error.message);
                // Optionally, inform the user about the login failure and suggest next steps
                // For example, updating the state to show an error message on the UI
                setErrors({ apiError: "Password Reset failed, Try again." });
            });
    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {fields.map((field) => (
                    <div key={field.id}>
                        <Input
                            handleChange={handleChange}
                            value={forgotPasswordState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                        {errors[field.id + "Error"] && <div className="text-red-500 text-sm mt-2">{errors[field.id + "Error"]}</div>}
                    </div>
                ))}
            </div>
            {loginError && <div className="text-red-500 text-sm mt-2">{loginError}</div>}

            {errors.apiError && <div className="text-red-500 text-sm mt-2">{errors.apiError}</div>}
            <FormAction handleSubmit={handleSubmit} text="Reset Password" />

        </form>
    );
}