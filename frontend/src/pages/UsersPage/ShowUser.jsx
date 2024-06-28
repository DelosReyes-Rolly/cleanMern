import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading';
import { isAuthenticated } from '../../Backend';
import { AiOutlineClose } from 'react-icons/ai'

const ShowUser = ({ user, onClose }) => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const authenticatedUser = isAuthenticated();
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
                    <h1 className='text-3xl my-4'>Show User</h1>
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Id</span>
                                <span>{user._id}</span>
                            </div>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Name</span>
                                <span>{user.name}</span>
                            </div>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Email</span>
                                <span>{user.email}</span>
                            </div>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Create Time</span>
                                <span>{user.createdAt}</span>
                            </div>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>User Type</span>
                                <span>{user.user_type}</span>
                            </div>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
                                <span>{user.updatedAt}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
    )
}

export default ShowUser