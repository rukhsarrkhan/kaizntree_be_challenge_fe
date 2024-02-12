import { useState } from 'react';
import { loginFields } from "../constants/formField";
import FormAction from "./FormAction";
import { useNavigate } from 'react-router-dom';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Logout() {
    const navigate = useNavigate();
    const access_token = sessionStorage.getItem('access_token');
    const refresh_token = sessionStorage.getItem('refresh_token');
    const [loginError, setLoginError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    };

    //Handle Login API Integration here
    const authenticateUser = () => {
        const endpoint = `http://127.0.0.1:8000/api/v1/auth/logout/`;
        const data = {
            refresh_token: refresh_token
        };
        fetch(endpoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                sessionStorage.removeItem('access_token');
                sessionStorage.removeItem('session_token');
                sessionStorage.clear();
                navigate('/login');
            })
            .catch(error => {
                console.log('Logout failed:', error.message);
                // Optionally, inform the user about the login failure and suggest next steps
                // For example, updating the state to show an error message on the UI
                setLoginError('Logout failed.');

            });

    };

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {loginError && <div className="text-red-500 text-sm mt-2">{loginError}</div>}
            <FormAction handleSubmit={handleSubmit} text="Logout" />

        </form>
    );
}