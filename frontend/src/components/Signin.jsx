import React, { useState } from 'react';
import { signin, authenticate } from '../Backend.js';
import { Navigate } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import { useNavigate } from "react-router-dom";

// Signin component for the login form
export function Signin() {

    // Initializing states for form fields, error, loading, and success messages
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        success: false,
    });



    const navigate = useNavigate();

    const refreshPage = () => {
        navigate(0);
    }

    // Destructuring values from the state
    const { email, password, error, loading, success } = values;

    // Handles changes in the input fields
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    // Submits the form data to the backend for user authentication
    const onSubmit = async event => {
        event.preventDefault();
        setValues({ ...values, success: false, loading: true });
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false, success: false });
                } else {
                    authenticate(data, () => {
                        setValues({ ...values, success: true });
                    })
                }
            })
            .catch();
    }

    // Displays error message if there's any
    const errorMessage = () => {
        return (<div className='error-message' style={{ display: error ? "" : "none", color: "red" }}>
            {error}
        </div>);
    }

    // Displays loading message during form submission
    const loadingMessage = () => {
        return (
            loading && (
                <div className="loading-message" style={{ display: error ? "" : "none", color: "red" }}>
                    <div className="loading-spinner"></div>
                    <p>Loading...</p>
                </div>
            )
        );
    }


    return (
        success ? <Home /> :
            <div style={{ background: '#282424'}}>
                <div className='grid min-h-screen place-items-center text-white'>
                    <div className='rounded-lg hover:shadow-xl w-2/4 p-10' style={{ backgroundColor: "#100c0c" }}>
                        <h2 className='text-center text-4xl font-bold mb-6'>Sign In</h2>
                        {loadingMessage()}
                        {errorMessage()}
                        <div className='form-group'>
                            <label htmlFor="email">Email</label><br />
                            <input className='w-full rounded border-b-4 outline-none border-blue-600 text-black p-2 mb-4' type="email" id="email" name="email" value={email} onChange={handleChange("email")} required autoFocus />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password">Password</label><br />
                            <input className='w-full rounded border-b-4 outline-none border-blue-600 text-black p-2 mb-4' type="password" id="password" name="password" value={password} onChange={handleChange("password")} required />
                        </div>
                        <div className="form-group-button grid place-items-center p-2"><br />
                            <button className='w-full bg-indigo-600 rounded-full p-2 hover:bg-indigo-800' onClick={onSubmit}>LOGIN</button>
                        </div>
                        <div className='login-message'>
                            <center><p className='login_redirect mt-2'>Don't have an account?<b><a href='/signup'> Sign up here</a></b></p></center>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Signin;