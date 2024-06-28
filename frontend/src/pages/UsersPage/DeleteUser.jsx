import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import Loading from '../../components/Loading'
import { isAuthenticated } from '../../Backend'
import { AiOutlineClose } from 'react-icons/ai'

const DeleteUser = ({ user, onClose }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const authenticatedUser = isAuthenticated();
    const handleDeleteUser = () => {
        axios
            .delete(`http://localhost:3000/users/${user._id}`)
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
            className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
            onClick={onClose}>
            <div
                onClick={(event) => event.stopPropagation()}
                className='w-[600px] max-w-full h-[400px] bg-black rounded-xl p-4 flex flex-col relative'>
                <AiOutlineClose
                    className='absolute right-6 top-6 text-2xl text-red-600 cursor-pointer'
                    onClick={onClose}
                />
                <h1 className='text-3xl my-4'>Delete User</h1>
                {loading ? <Loading /> : ''}
                <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
                    <h3 className='text-2xl '>Are you sure you want to delete this user?</h3>
                    <button
                        className='p-4 bg-red-600 text-white m-8 w-full'
                        onClick={handleDeleteUser}>
                        Yes, Delete it
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteUser