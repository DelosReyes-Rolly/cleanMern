import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Loading from '../../components/Loading'
import { isAuthenticated } from '../../Backend'
import { AiOutlineClose } from 'react-icons/ai'

const EditUser = ({ user, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user_type, setUserType] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const authenticatedUser = isAuthenticated();
    const [loading, setLoading] = useState(false);
    const handleEditUser = () => {
        const data = {
            name,
            email,
            user_type,
        };
        console.log(data);
        axios
            .put(`http://localhost:3000/users/${user._id}`, data)
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
            className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
            onClick={onClose}>
            <div
                onClick={(event) => event.stopPropagation()}
                className='w-[600px] max-w-full h-[400px] bg-black rounded-xl p-4 flex flex-col relative'>
                <AiOutlineClose
                    className='absolute right-6 top-6 text-2xl text-red-600 cursor-pointer'
                    onClick={onClose}
                />
                <h1 className='text=3xl my-4'>Edit User</h1>
                {loading ? <Loading /> : ''}
                <div className='flex flex-col border-2 border-sky-400 rounded -xl w-[600px] p-4 mx-auto'>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Name</label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2'
                        />
                    </div>
                </div>
                <div className='flex flex-col border-2 border-sky-400 rounded -xl w-[600px] p-4 mx-auto'>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Email</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2'
                        />
                    </div>
                </div>
                <div className='flex flex-col border-2 border-sky-400 rounded -xl w-[600px] p-4 mx-auto'>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>User Type</label>
                        <input
                            type='number'
                            value={user_type}
                            onChange={(e) => setUserType(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2'
                        />
                    </div>
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleEditUser}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditUser