import { useState } from 'react';
import { forgotPasswordFields } from "../constants/formField";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';

const fields = forgotPasswordFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');
let apiKey = "bjkabfk";

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [forgotPasswordState, setForgotPasswordState] = useState(fieldsState);
    const [loginError, setLoginError] = useState('');

    const handleChange = (e) => {
        setForgotPasswordState({ ...forgotPasswordState, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        resetPassword();
    };

    //Handle Reset Password API Integration here
    const resetPassword = () => {
        const endpoint = `http://127.0.0.1:8000/api/v1/auth/password-reset/`;
        fetch(endpoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(forgotPasswordState)
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                navigate('/forgot-password-success');
            })
            .catch(error => {
                console.log('Password Reset failed:', error.message);
                // Optionally, inform the user about the login failure and suggest next steps
                // For example, updating the state to show an error message on the UI
                setLoginError('Password Reset failed: Incorrect email.');

            });

    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
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

                    )
                }
            </div>
            {loginError && <div className="text-red-500 text-sm mt-2">{loginError}</div>}
            <FormAction handleSubmit={handleSubmit} text="Reset Password" />

        </form>
    );
}