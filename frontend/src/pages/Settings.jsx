import React from 'react'
import SidebarA from '../components/SidebarA.jsx'
import Dropdown from '../components/Dropdown.jsx'
import { isAuthenticated } from '../Backend.js';
import Signin from '../components/Signin.jsx'

const Settings = () => {
    const authenticatedUser = isAuthenticated(); // Check if the user is authenticated
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
                            <div className='p-6 xl:col-start-2 xl:col-span-2 lg:col-span-1 border-x-2 border-gray-800 mx-40'>
                                <p className='font-bold text-2xl p-8 text-center'>Personal Preferences</p>
                                <hr />
                                <p className='pt-10 pb-2 text-lg font-bold text-red-400'>Delete Account</p>
                                <p className='pb-2 text-lg pl-6'>
                                    Are you sure you want to delete your account?
                                    This will remove all of your information from our database. The action is irreversible.
                                </p>
                                <p className='border-b-2 border-gray-800'></p>
                                <div className="form-group-button p-2 flex justify-center items-center"><br /><br /><br /><br />
                                <input type='password' placeholder='To confirm, enter your password.' className='w-full border-b-2 rounded-lg outline-none border-blue-600 text-white p-2 mr-2 bg-gray-800' id='password' name='password' autoFocus/>
                                    <button className='w-1/4 bg-red-600 rounded-lg p-2 hover:bg-red-800'>Delete Account</button>
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