import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import BackButton from '../../components/BackButton'
import SidebarA from '../../components/SidebarA'
import Dropdown from '../../components/Dropdown'
import Loading from '../../components/Loading'
import { isAuthenticated } from '../../Backend'
import Home from '../Home'

const EditUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user_type, setUserType] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const authenticatedUser = isAuthenticated();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3000/users/${id}`)
            .then((response) => {
                setName(response.data.name);
                setEmail(response.data.email);
                setUserType(response.data.user_type);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false)
                alert('An error happened. Please Check')
                console.log(error);
            });
    }, [])
    const handleEditUser = () => {
        const data = {
            name,
            email,
            user_type,
        };
        console.log(data);
        axios
            .put(`http://localhost:3000/users/${id}`, data)
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
        authenticatedUser.user.user_type !== 0 ? <Home /> :
        <div style={{ background: '#282424' }}>
            <SidebarA />
            <div className="leftBody" style={{ color: 'white' }}>
                <Dropdown />
                <div className='pt-20 top-6 px-4 py-1'></div>
                <div className='p-4'>
                    <BackButton />
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
        </div>
    )
}

export default EditUser