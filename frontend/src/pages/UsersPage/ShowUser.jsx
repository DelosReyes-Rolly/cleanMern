import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading';
import { isAuthenticated } from '../../Backend';
import { AiOutlineClose } from 'react-icons/ai'

const ShowUser = ({ user, onClose }) => {
    const [loading, setLoading] = useState(false);
    let userTypeString = '';
    if (user.user_type == 0) {
        userTypeString = 'Admin'
    } else {
        userTypeString = 'User'
    }

    function getDate(date) {
        let today = new Date(date);
        return new Intl.DateTimeFormat('en-US', { month: 'long', date: 'numeric', year: 'numeric' }).format(today);
    }
    return (
        <div
            className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-40 flex justify-center items-center'
            onClick={onClose}>
            <div
                onClick={(event) => event.stopPropagation()}
                className='w-[800px] max-w-full h-[400px] bg-gray-600 rounded-xl p-4 flex flex-col relative sm:h-[800px]'>
                <AiOutlineClose
                    className='absolute right-6 top-6 text-2xl text-red-600 cursor-pointer'
                    onClick={onClose}
                />
                <h1 className='text-2xl my-4 border-b-2 border-gray-800 pb-2'>Show User</h1>
                {loading ? (
                    <Loading />
                ) : (
                    <div className='grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
                        <div className='my-2 pl-4 pr-2'>
                            <div className='text-xl mr-4 text-white'>ID: </div>
                            <div className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-4 bg-gray-800'>{user._id}</div>
                        </div>
                        <div className='my-2 pl-4 pr-2'>
                            <div className='text-xl mr-4 text-white'>Name: </div>
                            <div className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-4 bg-gray-800'>{user.name}</div>
                        </div>
                        <div className='my-2 pl-4 pr-2'>
                            <div className='text-xl mr-4 text-white'>Email: </div>
                            <div className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-4 bg-gray-800'>{user.email}</div>
                        </div>
                        <div className='my-2 pl-4 pr-2'>
                            <div className='text-xl mr-4 text-white'>Created At: </div>
                            <div className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-4 bg-gray-800'>{getDate(user.createdAt)}</div>
                        </div>
                        <div className='my-2 pl-4 pr-2'>
                            <div className='text-xl mr-4 text-white'>User Type: </div>
                            <div className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-4 bg-gray-800'>{userTypeString}</div>
                        </div>
                        <div className='my-2 pl-4 pr-2'>
                            <div className='text-xl mr-4 text-white'>Updated At: </div>
                            <div className='w-full border-b-4 rounded-lg outline-none border-blue-600 text-white p-2 mb-4 bg-gray-800'>{getDate(user.updatedAt)}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShowUser