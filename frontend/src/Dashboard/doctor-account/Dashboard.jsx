import React, { useContext, useEffect, useState } from 'react';
import userImg from '../../assets/images/doctor-img01.png';
import { authContext } from '../../context/AuthContext.jsx'; 
import axios from 'axios';
import { BASE_URL } from '../../config.js';

const Dashboard = () => {
  const { user, token, role, dispatch } = useContext(authContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL+'/doctors/profile/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch user data', error);
        // Handle error, e.g., redirect to login page
      }
    };

    fetchData();
  }, [token]); // Ensure to include token as a dependency to re-run the effect when it changes

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    // Additional logic if needed, e.g., redirect to login page
    history.push('/login');
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='max-w-[800px] px-12 py-8 mx-auto bg-white shadow-lg rounded-md'>
        <div className='flex flex-col items-center justify-center space-y-8'>
          <div className='flex items-center justify-center'>
            <figure className='w-24 h-24 rounded-full overflow-hidden border-4 border-solid border-primaryColor'>
              <img src={userImg} alt='' className='w-full h-full object-cover' />
            </figure>
          </div>

          <div className='text-center'>
            <h3 className='text-3xl font-bold text-headingColor'>{userData?.name}</h3>
            <p className='text-gray-600 text-lg font-medium'>{userData?.email}</p>
            {/* Display other user profile information here */}
          </div>

          <div className='space-y-6'>
            <button
              onClick={handleLogout}
              className='w-full bg-[#181A1E] text-white py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring focus:border-primaryColor'
            >
              Logout
            </button>
            <button
              className='w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-700'
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
