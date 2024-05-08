import React, { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import Validation from "/home/sass/Desktop/callAst/call-ast/Backend/validation/signupValidation.js"
import axios from 'axios'

interface FormValues {
    name: string;
    email: string;
    password: string;
}

const RegistrationForm: React.FC = () => {
    const [values, setValues] = useState<FormValues>({
        name: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<FormValues>({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues(prevValues => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Validate form fields
        const validationErrors: FormValues = {
            name: values.name ? '' : 'Name is required',
            email: values.email ? '' : 'Email is required',
            password: values.password ? '' : 'Password is required'
        };
        setErrors(validationErrors);
        
        // Check if there are any validation errors
        if (Object.values(validationErrors).every(error => !error)) {
            try {
                // Make POST request to server
                const response = await axios.post('http://localhost:8081/register', values);
                console.log('Response:', response.data);
            
                // Navigate to another page upon successful registration
                // Example: history.push('/dashboard');
            } catch (error) {
                console.error('Error registering user:', error);
            }
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='n-1'>
                        <label htmlFor='name'><strong>Name</strong></label>
                        <input type='text' placeholder='Enter name' name='name' value={values.name} onChange={handleInputChange} className='form-control rounded-0' />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='n-1'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' placeholder='Enter email' name='email' value={values.email} onChange={handleInputChange} className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='n-1'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type='password' placeholder='Enter password' name='password' value={values.password} onChange={handleInputChange} className='form-control rounded-0' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success'>Register</button>
                    <Link to='/' className='btn btn-create-account'>Login</Link>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
