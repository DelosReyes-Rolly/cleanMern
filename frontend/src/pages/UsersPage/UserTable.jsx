import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'
import Home from '../Home'
import { isAuthenticated } from '../../Backend'

const UserTable = ({ users }) => {
    const authenticatedUser = isAuthenticated(); // Check if the user is authenticated
    return (
        authenticatedUser.user.user_type !== 0 ? <Home /> :
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>No</th>
                        <th className='border border-slate-600 rounded-md'>Name</th>
                        <th className='border border-slate-600 rounded-md max-md:hidden'>Email</th>
                        <th className='border border-slate-600 rounded-md'>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id} className='h-8'>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {index + 1}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                {user.name}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                {user.email}
                            </td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <Link to={`/users/details/${user._id}`}>
                                    <BsInfoCircle className='text-2xl text-green-800' />
                                </Link>
                                <Link to={`/users/edit/${user._id}`}>
                                    <AiOutlineEdit className='text-2xl text-yellow-800' />
                                </Link>
                                <Link to={`/users/delete/${user._id}`}>
                                    <MdOutlineDelete className='text-2xl text-red-800' />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    )
}

export default UserTable