import React, { useState } from "react";
import { signup } from "../Backend.js";

// Signup component for the signup form
function Signup() {

    const [formValues, setFormValues] = useState({
        email: "",
        name: "",
        password: "",
        error: "",
        loading: false,
        success: false,
    });

    // Destructuring values from the state
    const { name, email, password, error, loading, success } = formValues;

    // Handles changes in the input fields
    const handleChange = name => event => {
        setFormValues({ ...formValues, error: false, [name]: event.target.value });
    }

    // Submits the form data to the backend
    const onSubmit = async event => {
        event.preventDefault();
        setFormValues({ ...formValues, success: false, loading: true });

        // Placeholder for the signup function calling the backend
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setFormValues({ ...formValues, error: data.error, loading: false, success: false });
                } else {
                    setFormValues({ ...formValues, success: true });
                }
            })
            .catch();
    }

    // Displays error message if there's any
    const errorMessage = () => {
        return (
            <div className='error-message' style={{ display: error ? "" : "none", color: "red" }}>
                {error}
            </div>
        );
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

    // Displays success message upon successful form submission
    const successMessage = () => {
        return (
            success && (
                <div>
                    <center><p className='login_redirect mt-2'>Account created successfully <b><a href='/login'>Login here</a></b></p></center>
                </div>
            )
        );
    }



    return (
        <div style={{ background: '#282424' }} className="text-white">
            <div className='grid h-screen place-items-center'>
                <div className='rounded-lg hover:shadow-xl w-1/2 p-10' style={{ backgroundColor: "#100c0c" }}>
                    <h2 className='text-center text-4xl font-bold mb-6'>Create an account</h2>
                    {errorMessage()}
                    {loadingMessage()}
                    {successMessage()}
                    <div className='form-group'>
                        <label htmlFor="name">Username</label><br />
                        <input className='w-full rounded border-b-4 outline-none border-blue-600 text-black p-2 mb-4' type="text" id="name" name="name" onChange={handleChange("name")} required autoFocus />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">Email</label><br />
                        <input className='w-full rounded border-b-4 outline-none border-blue-600 text-black p-2 mb-4' type="email" id="email" name="email" onChange={handleChange("email")} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password</label><br />
                        <input className='w-full rounded border-b-4 outline-none border-blue-600 text-black p-2 mb-4' type="password" id="password" name="password" onChange={handleChange("password")} required />
                    </div>
                    <div className="form-group-button grid place-items-center p-2"><br />
                        <button className='w-full bg-indigo-600 rounded-full p-2 hover:bg-indigo-800' onClick={onSubmit}>Signup</button>
                    </div>
                    <div className='login-message'>
                        <center><p className='login_redirect mt-2'>Already have an account?<b><a href='/'> Log in here</a></b></p></center>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;