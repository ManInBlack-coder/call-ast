import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import validateLoginForm from '../hooks/validation';

interface LoginFormValues {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [values, setValues] = useState<LoginFormValues>({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState<Partial<LoginFormValues>>({}); // Define errors as Partial<LoginFormValues>

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors({}); // Clear previous errors

        const validationErrors = validateLoginForm(values);
        setErrors(validationErrors);

        if (!Object.values(validationErrors).some(error => !!error)) {
            axios.post('http://localhost:8081/login', values)
                .then(res => {
                    if (res.data.Login === true) {
                        navigate('/');
                    } else {
                        alert('No such user');
                    }
                })
                .catch(err => {
                    console.error('Error logging in:', err);
                });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={values.email} onChange={handleInput} />
                    {errors.email && <span>{errors.email}</span>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={values.password} onChange={handleInput} />
                    {errors.password && <span>{errors.password}</span>}
                </div>
                <button type="submit">Login</button>
                <Link to='/register' className='btn btn-create-account'>create account</Link>
            </form>
        </div>
    );
};

export default Login;
