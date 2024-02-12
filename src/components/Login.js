import { useState } from 'react';
import { loginFields } from "../constants/formField";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');
let apiKey = "bjkabfk";

export default function Login() {
    const navigate = useNavigate();

    const [loginState, setLoginState] = useState(fieldsState);
    const [loginError, setLoginError] = useState('');

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    };

    //Handle Login API Integration here
    const authenticateUser = () => {
        const endpoint = `http://127.0.0.1:8000/api/v1/auth/login/`;
        fetch(endpoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginState)
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                sessionStorage.setItem('access_token', data.access_token);
                sessionStorage.setItem('refresh_token', data.refresh_token);

                // const myValue = sessionStorage.getItem('myKey');
                //sessionStorage.removeItem('myKey');
                //sessionStorage.clear();
                navigate('/dashboard');
            })
            .catch(error => {
                console.log('Login failed:', error.message);
                // Optionally, inform the user about the login failure and suggest next steps
                // For example, updating the state to show an error message on the UI
                setLoginError('Login failed: Incorrect email or password.');

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
                            value={loginState[field.id]}
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
            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />

        </form>
    );
}