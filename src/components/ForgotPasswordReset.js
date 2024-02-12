import { useState } from 'react';
import { passwordResetFields } from "../constants/formField";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate, useParams } from 'react-router-dom';

const fields = passwordResetFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');
let apiKey = "bjkabfk";

export default function ForgotPasswordReset() {
    const navigate = useNavigate();
    const { uidb64, token } = useParams();

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
        const endpoint = `http://127.0.0.1:8000/api/v1/auth/set-new-password/`;
        const data = {
            'password': forgotPasswordState.password,
            'confirm_password': forgotPasswordState.confirm_password,
            'uidb64': uidb64,
            'token': token
        };

        const formData = new FormData();
        formData.append('password', forgotPasswordState.password);
        formData.append('confirm_password', forgotPasswordState.confirm_password);
        formData.append('uidb64', uidb64);
        formData.append('token', token);


        fetch(endpoint,
            {
                method: 'PATCH',
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                // },
                body: formData
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                navigate('/');
            })
            .catch(error => {
                console.log('Password Reset failed:', error.message);
                // Optionally, inform the user about the login failure and suggest next steps
                // For example, updating the state to show an error message on the UI
                setLoginError('Password Reset failed, Try again.');

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