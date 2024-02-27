import React, { useContext, useState, useEffect } from 'react';
import { authContext } from './../../context/AuthContext';
import userImg from '../../assets/images/doctor-img01.png';
import MyBookings from './MyBookings';
import Profile from './Profile';
import useGetProfile from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { toast } from 'react-toastify';
import Insights from '../admin-account/Insights';
import Modal from './Modal';

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState('bookings');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const {
    data: userData,
    loading,
    error
  } = useGetProfile(`${BASE_URL}/users/profile/me`);
  useEffect(() => {
    if (!userData.isPremiumUser) {
      setIsUpgradeModalOpen(true); // Display modal as an alert when the component mounts if user is not premium
    } else {
      setIsUpgradeModalOpen(false); // Close the modal if the user is premium
    }
  }, [userData.isPremiumUser]);
  
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  const handleUpgradeNow = () => {
    // Handle upgrade now logic
    setIsUpgradeModalOpen(false);
  };

  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                  <img src={userData.photo} alt="" className='w-full h-full rounded-full' />
                </figure>
              </div>
              <div className="text-center mt-4">
                <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>
                  {userData.name}
                </h3>
                {userData.isPremiumUser ? (
                  <span className="inline-block px-2 py-1 bg-yellow-500 text-white text-sm rounded-md">
                    Premium User
                  </span>
                ) : (
                  <div>
                    <p className="text-textColor text-[15px] leading-6 font-medium">
                      Upgrade to Premium?
                    </p>
                    <button
                      onClick={() => setIsUpgradeModalOpen(true)}
                      className="mt-2 bg-[#181A1E] p-2 text-sm text-white rounded-md"
                    >
                      Upgrade Now
                    </button>
                  </div>
                )}
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {userData.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type:
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {userData.bloodType ? userData.bloodType : 'Not set'}
                  </span>
                </p>
              </div>
              <div className="mt-[50px] md:mt-[100px]">
                <button onClick={handleLogout} className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white">
                  Logout
                </button>
                <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                  Delete account
                </button>
              </div>
            </div>
            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab('bookings')}
                  className={` ${tab === 'bookings' && 'bg-primaryColor text-white font-normal'}
            p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  My Bookings
                </button>
                {userData.isPremiumUser && (
                  <button
                    onClick={() => setTab('insights')}
                    className={` ${tab === 'insights' && 'bg-primaryColor text-white font-normal'}
            p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                  >
                    View Insights (Only for Premium Users)
                  </button>
                )}
                <button
                  onClick={() => setTab('settings')}
                  className={` ${tab === 'settings' && 'bg-primaryColor text-white font-normal'} 
            py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>
              {tab === 'bookings' && <MyBookings />}
              {tab === 'settings' && <Profile user={userData} />}
              {tab === 'insights' && <Insights />}
            </div>
          </div>
        )}
      </div>
      <Modal userId={userData._id}
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onUpgradeNow={handleUpgradeNow}
      />
    </section>
  );
};

export default MyAccount;
