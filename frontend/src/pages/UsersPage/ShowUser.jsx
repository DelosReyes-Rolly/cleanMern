import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton';
import SidebarA from '../../components/SidebarA';
import Dropdown from '../../components/Dropdown';
import Loading from '../../components/Loading';
import { isAuthenticated } from '../../Backend';
import Home from '../Home';

const ShowUser = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const authenticatedUser = isAuthenticated();
    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3000/users/${id}`)
            .then((response) => {
                setUser(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, [])
    return (
        authenticatedUser.user.user_type !== 0 ? <Home /> :
            <div style={{ background: '#282424' }}>
                <SidebarA />
                <div className="leftBody" style={{ color: 'white' }}>
                    <Dropdown />
                    <div className='pt-20 top-6 px-4 py-1'></div>
                    <div className='p-4'>
                        <BackButton />
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
            </div>
    )
}

export default ShowUser