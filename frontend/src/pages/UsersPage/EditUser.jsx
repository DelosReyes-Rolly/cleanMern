import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Loading from '../../components/Loading'
import { AiOutlineClose } from 'react-icons/ai'

const EditUser = ({ user, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user_type, setUserType] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const handleEditUser = () => {
        const data = {
            name,
            email,
            user_type,
        };
        console.log(data);
        axios
            .put(`https://music-review.onrender.com/users/${user._id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('User Edited Successfully', { variant: 'suceess' });
                navigate('/users');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('An error happened.', { variant: 'error' });
                console.log(error);
            });
    };
    return (
        <div
            className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-40 flex justify-center items-center'
            onClick={onClose}>
            <div
                onClick={(event) => event.stopPropagation()}
                className='w-[800px] max-w-full h-[600px] bg-gray-600 rounded-xl p-4 flex flex-col relative sm:h-[800px]'>
                <AiOutlineClose
                    className='absolute right-6 top-6 text-2xl text-red-600 cursor-pointer'
                    onClick={onClose}
                />
                <h1 className='text-2xl my-4 border-b-2 border-gray-800 pb-2'>Edit User</h1>
                {loading ? <Loading /> : ''}
                <div className='my-2'>
                    <label className='text-xl mr-4 text-white'>Name</label><br />
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-4 bg-gray-800'
                        required
                        maxLength={255}
                    />
                </div>
                <div className='my-2'>
                    <label className='text-xl mr-4 text-white'>Email</label><br />
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-4 bg-gray-800'
                        required
                        maxLength={255}
                    />
                </div>
                <div className='my-2'>
                    <label className='text-xl mr-4 text-white'>User Type</label><br />
                    <input
                        type='number'
                        value={user_type}
                        onChange={(e) => setUserType(e.target.value)}
                        className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-4 bg-gray-800'
                        required
                        maxLength={0}
                        min={0}
                        max={1}
                    />
                </div>
                <div className="form-group-button grid place-items-center p-2"><br />
                    <button className='w-1/2 bg-indigo-600 rounded-lg p-2 hover:bg-indigo-800' onClick={handleEditUser}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditUser