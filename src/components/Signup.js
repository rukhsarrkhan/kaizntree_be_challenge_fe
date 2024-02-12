import { useState } from 'react';
import { signupFields } from "../constants/formField";
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
    const navigate = useNavigate();

    const [signupState, setSignupState] = useState(fieldsState);
    const [loginError, setLoginError] = useState('');

    const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(signupState);
        createAccount();
    };

    //handle Signup API Integration here
    const createAccount = () => {
        const endpoint = `http://127.0.0.1:8000/api/v1/auth/register/`;
        fetch(endpoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupState)
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                navigate('/login');
            })
            .catch(error => {
                console.log('Signup failed:', error.message);
                // Optionally, inform the user about the login failure and suggest next steps
                // For example, updating the state to show an error message on the UI
                setLoginError('Signup failed: Incorrect email or password.');

            });

    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {
                    fields.map(field =>
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

                    )
                }
            </div>
            {loginError && <div className="text-red-500 text-sm mt-2">{loginError}</div>}
            <FormAction handleSubmit={handleSubmit} text="Signup" />

        </form>
    );
}