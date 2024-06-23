import React from 'react';
import { isAuthenticated, signout } from '../Backend.js';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate(); // Initialize navigation
    const authenticatedUser = isAuthenticated(); // Check if the user is authenticated

    // Function to handle signout action
    const onSignout = () => {
        signout(); // Perform signout action
        console.log("Signed out");
        navigate('/signin'); // Redirect to login page after sign out
    };

    return (
        !authenticatedUser ? navigate('/signin') :
            <div className='dashboard'>
                <button onClick={onSignout}>Sign Out</button>
                <h1>Hello, {authenticatedUser.user.name}</h1> {/* Display user's name */}
            </div>
    );
};

export default Dashboard;