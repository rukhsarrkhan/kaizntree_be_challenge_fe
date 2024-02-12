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
            }).then(response => response.json())
            .then(data => {
                sessionStorage.setItem('session_token', data.access_token);
                // const myValue = sessionStorage.getItem('myKey');
                //sessionStorage.removeItem('myKey');
                //sessionStorage.clear();
                navigate('/kaizntree_be_challenge_fe/dashboard');
            })
            .catch(error => console.log(error));

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

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />

        </form>
    );
}