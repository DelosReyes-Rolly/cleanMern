import React, { useState } from 'react'
import { isAuthenticated } from '../Backend.js';
import Signin from './Signin.jsx';
import { signout } from '../Backend.js';
import { Link, useNavigate } from 'react-router-dom';

const Dropdown = () => {
    const authenticatedUser = isAuthenticated(); // Check if the user is authenticated
    const [isOpen, setOpen] = useState(false);
    const handleDropDown = () => {
        setOpen(!isOpen);
    };
    const navigate = useNavigate(); // Initialize navigation

    // Function to handle signout action
    const onSignout = () => {
        signout(); // Perform signout action
        console.log("Signed out");
        navigate('/'); // Redirect to login page after sign out
    };

    return (
        !authenticatedUser ? <Signin /> :
            <div className="dropdown">
                <button
                    className={`absolute top-6 right-8 w-44 px-4 py-2.5 inline-flex items-center ${isOpen ? 'rounded-t-lg' : 'rounded-lg'}`}
                    onClick={handleDropDown}
                    style={{ backgroundColor: '#000000' }}
                >

                    <p className='font-bold'>{authenticatedUser.user.name}</p>
                    <svg
                        className="ml-2 w-4 h-4"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                </button>

                <div
                    id="dropdown"
                    className={`absolute top-8 right-4 w-44 rounded-lg shadow transition-opacity ease-in-out duration-400 ${isOpen ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <ul className="absolute top-8 right-4 w-44 bg-black rounded-lg shadow ">
                        <li>
                            <Link to={"/profile"}>
                                <button type='button' className="block py-2 px-4 hover:outline-none hover:bg-gray-800 w-full">
                                    <p className='float-left inset-y-0 left-0'>Profile</p>
                                </button>
                            </Link>
                            <button className="block py-2 px-4 hover:outline-none hover:bg-gray-800 w-full">
                                <p className='float-left inset-y-0 left-0'>Settings</p>
                            </button>
                            <button className="block py-2 px-4 hover:outline-none hover:bg-gray-800 w-full border-t-2 border-gray-800" onClick={onSignout}>
                                <p className='float-left inset-y-0 left-0'>Sign Out</p>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
    )
}
export default Dropdown