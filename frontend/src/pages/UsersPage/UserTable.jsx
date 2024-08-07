import React, { useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
import Home from '../Home'
import { isAuthenticated } from '../../Backend'
import ShowUser from './ShowUser'
import EditUser from './EditUser'
import DeleteUser from './DeleteUser'

const UserTable = ({ users }) => {
    const authenticatedUser = isAuthenticated(); // Check if the user is authenticated
    const [showUsersModal, setShowUsersModal] = useState(false);
    const [editUsersModal, setEditUsersModal] = useState(false);
    const [deleteUsersModal, setDeleteUsersModal] = useState(false);
    return (
        authenticatedUser.user.user_type !== 0 ? <Home /> :
            <div className="flex flex-col">
                <div className="m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border rounded-lg overflow-hidden dark:border-neutral-700 dark:shadow-gray-900">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead className="bg-gray-50 dark:bg-neutral-700 shadow-2xl">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase dark:text-white">No</th>
                                        <th scope="col" className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase dark:text-white">Name</th>
                                        <th scope="col" className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase dark:text-white">Email</th>
                                        <th scope="col" className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase dark:text-white">Operations</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-600 bg-gray-800 shadow-2xl">
                                    {users.map((user, index) => (
                                        <tr key={user._id} className='className="odd:bg-blue-60"'>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                {user.name}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                {user.email}
                                            </td>
                                            <td className="flex px-4 py-4 whitespace-nowrap text-gray-800 dark:text-neutral-200">
                                                <button className='flex items-stretch p-2 mr-2 bg-green-600 rounded-lg hover:bg-green-800 shadow-2xl' onClick={() => setShowUsersModal(true)}>
                                                    <BsInfoCircle className="text-2xl cursor-pointer" />&nbsp;View
                                                </button>
                                                <button className='flex items-stretch p-2 mr-2 bg-yellow-600 rounded-lg hover:bg-yellow-800 shadow-2xl' onClick={() => setEditUsersModal(true)}>
                                                    <AiOutlineEdit className="text-2xl cursor-pointer" />&nbsp;Update
                                                </button>
                                                <button className='flex items-stretch p-2 mr-2 bg-red-600 rounded-lg hover:bg-red-800 shadow-2xl' onClick={() => setDeleteUsersModal(true)}>
                                                    <MdOutlineDelete className="text-2xl cursor-pointer" />&nbsp;Delete
                                                </button>
                                                {
                                                    showUsersModal && (
                                                        <ShowUser user={user} onClose={() => setShowUsersModal(false)} />
                                                    )
                                                }
                                                {
                                                    editUsersModal && (
                                                        <EditUser user={user} onClose={() => setEditUsersModal(false)} />
                                                    )
                                                }
                                                {
                                                    deleteUsersModal && (
                                                        <DeleteUser user={user} onClose={() => setDeleteUsersModal(false)} />
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default UserTable