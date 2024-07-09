import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Loading from '../../components/Loading'
import { AiOutlineClose } from 'react-icons/ai'

const DeleteUser = ({ user, onClose }) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const handleDeleteUser = () => {
        axios
            .delete(`https://music-review.onrender.com/users/${user._id}`)
            .then((response) => {
                setLoading(false);
                enqueueSnackbar('User Deleted Successfully', { variant: 'suceess' });
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
                className='w-[600px] max-w-full h-[200px] bg-gray-600 rounded-xl p-4 flex flex-col relative'>
                <AiOutlineClose
                    className='absolute right-6 top-6 text-2xl text-red-600 cursor-pointer'
                    onClick={onClose}
                />
                <h1 className='text-2xl my-4 border-b-2 border-gray-800 pb-2'>Delete User</h1>
                {loading ? <Loading /> : ''}
                <h3 className='text-xl mr-4 text-white'>Are you sure you want to delete this user?</h3><br/>
                <button
                    className='w-full bg-red-600 rounded-lg p-2 hover:bg-red-800'
                    onClick={handleDeleteUser}>
                    Yes, Delete it
                </button>
            </div>
        </div>
    )
}

export default DeleteUser