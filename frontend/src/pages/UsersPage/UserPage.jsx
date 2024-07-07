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
              <div className='border-grey-500 rounded-lg px-4 py-2 m-4 relatice hover:shadow-xl' style={{ backgroundColor: "#100c0c" }}>
                <h1 className='text-3xl border-b-2 border-gray-800 pt-4 pb-2'>Users List</h1>
                <br/>
                {loading ? (
                  <Loading />
                ) : (
                  <UserTable users={users} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default UserPage