import React, { useContext } from 'react';
import userImg from '../../assets/images/doctor-img01.png';
import { authContext } from '../../context/AuthContext.jsx'; // Replace with the correct path

const Dashboard = () => {
  const { user, token, role, dispatch } = useContext(authContext);

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
            <h3 className='text-3xl font-bold text-headingColor'>Muhibur Rahman</h3>
            <p className='text-gray-600 text-lg font-medium'>example@gmail.com</p>
            <p className='text-gray-600 text-lg font-medium'>
              Blood Type: <span className='text-headingColor'>O-</span>
            </p>
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
