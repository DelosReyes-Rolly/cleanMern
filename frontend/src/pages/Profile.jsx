import React, { useEffect, useState } from 'react'
import SidebarA from '../components/SidebarA.jsx'
import Dropdown from '../components/Dropdown.jsx'
import { isAuthenticated } from '../Backend.js';
import Signin from '../components/Signin.jsx'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const authenticatedUser = isAuthenticated(); // Check if the user is authenticated
    const [name, setName] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    useEffect(() => {
        setName(authenticatedUser.user.name);
    }, [])

    const handleEditProfile = () => {
        const data = {
            name,
        };
        console.log(data);
        axios
            .put(`https://music-review.onrender.com/edit/profile/${authenticatedUser.user._id}`, data)
            .then(() => {
                enqueueSnackbar('Profile Edited Successfully', { variant: 'suceess' });
                navigate('/profile');
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
                        <p className='pb-4 font-bold text-xl'>Profile Information</p>
                        <hr />
                        <div className='border-grey-500 rounded-lg px-4 py-2 mt-4 mb-4 relatice hover:shadow-xl' style={{ backgroundColor: "#100c0c" }}>
                            <div className='grid sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-4'>
                                <div className='p-6 text-center'>
                                    <div className='flex justify-center'>
                                        <img src='/profile-picture.png' className='w-1/2 pb-6 pt-20'></img>
                                    </div>
                                    <p className='font-bold text-xl pb-6'>{authenticatedUser.user.name}</p>
                                    <p>User</p>
                                </div>
                                <div className='p-6 xl:col-start-2 xl:col-span-2 lg:col-span-1 border-x-2 border-gray-800'>
                                    <p className='font-bold text-2xl p-8 text-center'>Profile Settings</p>
                                    <hr />
                                    <label htmlFor='name' className='pt-10 pb-2 text-lg'>Name</label>
                                    <input type='text'
                                        placeholder={authenticatedUser.user.name}
                                        className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-4 bg-gray-800'
                                        id='name'
                                        name='name'
                                        autoFocus
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} />
                                    <p className='border-b-2 border-gray-800'></p>
                                    <div className="form-group-button grid place-items-center p-2"><br />
                                        <button className='w-1/4 bg-indigo-600 rounded-lg p-2 hover:bg-indigo-800' onClick={handleEditProfile}>Submit</button>
                                    </div>
                                </div>
                                <div className='p-6'>
                                    <p className='pt-10 text-md'>Additional Information</p>
                                    <div className='p-6'>
                                        <p className='pb-2 text-lg'>Email</p>
                                        <input type='email' placeholder={authenticatedUser.user.email} className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-4 bg-gray-800' id='email' name='email' readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
    )
}

export default Profile