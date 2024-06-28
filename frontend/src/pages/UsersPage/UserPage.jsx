import React, { useEffect, useState } from 'react'
import UserTable from './UserTable'
import axios from 'axios'
import SidebarA from '../../components/SidebarA';
import Dropdown from '../../components/Dropdown';
import Loading from '../../components/Loading';
import { isAuthenticated } from '../../Backend';
import Home from '../Home';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const authenticatedUser = isAuthenticated();

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3000/users')
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    authenticatedUser.user.user_type !== 0 ? <Home /> :
      <div style={{ background: '#282424' }} className='min-h-screen'>
        <SidebarA />
        <div className="leftBody" style={{ color: 'white' }}>
          <Dropdown />
          <div className='pt-20 top-6 px-4 py-1'></div>
          <div style={{ paddingTop: '40px' }}>
            <div className='justify-between items-center'>
              <h1 className='text-3xl my-8'>Users List</h1>
              {loading ? (
                <Loading />
              ) : (
                <UserTable users={users} />
              )}
            </div>
          </div>
        </div>
      </div>
  )
}

export default UserPage