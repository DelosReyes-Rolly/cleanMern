import React, { useState } from 'react'
import SidebarA from '../components/SidebarA.jsx'
import Dropdown from '../components/Dropdown.jsx'
import { isAuthenticated } from '../Backend.js';
import Signin from '../components/Signin.jsx'
import axios from 'axios'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import { signout } from '../Backend.js';
import HomeOne from './UsersPage/UserPage.jsx';

const Settings = () => {
    const [password, setPassword] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const authenticatedUser = isAuthenticated(); // Check if the user is authenticated
    const id = authenticatedUser.user._id;
    const handleDeleteProfile = () => {
        const data = {
            password,
        };
        console.log(data);
        axios
            .post(`https://music-review.onrender.com/check/password/${id}`, data)
            .then(() => {
                signout();
                console.log("Signed out");
                navigate('/');
                axios
                    .delete(`https://music-review.onrender.com/delete/profile/${id}`)
                    .then((response) => {
                        enqueueSnackbar('Profile Deleted Successfully', { variant: 'suceess' });
                    })
                    .catch((error) => {
                        enqueueSnackbar('An error happened.', { variant: 'error' });
                        console.log(error);
                    })
            })
            .catch((error) => {
                enqueueSnackbar('An error happened.', { variant: 'error' });
                console.log(error);
            });

    };
    return (
        !authenticatedUser ? <Signin /> :
            <div style={{ background: '#282424', height: '100vh' }}>
                <SidebarA />
                <div className="leftBody" style={{ color: 'white' }}>
                    <Dropdown />
                    <div className='pt-40 px-4 py-1'>
                        <p className='pb-4 font-bold text-xl'>Settings</p>
                        <hr />
                        <div className='border-grey-500 rounded-lg px-4 py-2 mt-4 mb-4 relatice hover:shadow-xl' style={{ backgroundColor: "#100c0c" }}>
                            <div className='p-6 xl:col-start-2 border-x-2 border-gray-800'>
                                <p className='font-bold text-2xl p-8 text-center'>Personal Preferences</p>
                                <hr />
                                <p className='pt-10 pb-2 text-lg font-bold text-red-400'>Delete Account</p>
                                <p className='pb-2 text-lg pl-6'>
                                    Are you sure you want to delete your account?
                                    This will remove all of your information from our database. The action is irreversible.
                                </p>
                                <p className='border-b-2 border-gray-800'></p>
                                <div className="form-group-button p-2 flex justify-center items-center"><br /><br /><br /><br />
                                    <input type='password'
                                        placeholder='To confirm, enter your password.'
                                        className='w-full border-b-2 rounded-lg outline-none border-blue-600 text-white p-2 mr-2 bg-gray-800'
                                        id='password'
                                        name='password'
                                        autoFocus
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                    <button className='w-1/4 bg-red-600 rounded-lg p-2 hover:bg-red-800' onClick={handleDeleteProfile}>Delete Account</button>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
    )
}

export default Settings