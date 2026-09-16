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
    <section className="py-12 bg-slate-50/50 min-h-[calc(100vh-80px)]">
      <div className='max-w-[1200px] px-4 sm:px-6 mx-auto'>
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl text-center h-fit">
              <div className="flex items-center justify-center">
                <figure className='w-28 h-28 rounded-full border-4 border-primaryColor/20 shadow-md overflow-hidden'>
                  <img src={userData.photo || userImg} alt="" className='w-full h-full object-cover' />
                </figure>
              </div>
              <div className="mt-5">
                <h3 className='text-[20px] font-[800] text-headingColor tracking-tight'>
                  {userData.name}
                </h3>
                <p className="text-slate-500 text-sm font-medium mt-1">
                  {userData.email}
                </p>

                {userData.isPremiumUser ? (
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200">
                      ⭐ Premium Member
                    </span>
                  </div>
                ) : (
                  <div className="mt-4 p-4 rounded-2xl bg-primaryColor/5 border border-primaryColor/10">
                    <p className="text-headingColor text-xs font-semibold">
                      Unlock AI Health Insights
                    </p>
                    <button
                      onClick={() => setIsUpgradeModalOpen(true)}
                      className="mt-2 w-full py-2 text-xs font-bold text-white bg-primaryColor hover:bg-primaryDark transition-colors rounded-xl shadow-md shadow-primaryColor/20"
                    >
                      Upgrade to Premium
                    </button>
                  </div>
                )}

                <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-medium">Blood Type</span>
                  <span className="font-bold text-headingColor px-2.5 py-0.5 rounded-lg bg-slate-100">
                    {userData.bloodType ? userData.bloodType : 'Not set'}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={handleLogout}
                  className="w-full py-3 text-sm font-semibold rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md"
                >
                  Logout
                </button>
                <button className="w-full py-2.5 text-xs font-semibold rounded-2xl text-red-600 hover:bg-red-50 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>

            <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl">
              <div className="flex flex-wrap gap-2.5 pb-6 border-b border-slate-100">
                <button
                  onClick={() => setTab('bookings')}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                    tab === 'bookings'
                      ? 'bg-primaryColor text-white shadow-lg shadow-primaryColor/25'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  My Bookings
                </button>
                {userData.isPremiumUser && (
                  <button
                    onClick={() => setTab('insights')}
                    className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                      tab === 'insights'
                        ? 'bg-primaryColor text-white shadow-lg shadow-primaryColor/25'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    AI Insights
                  </button>
                )}
                <button
                  onClick={() => setTab('settings')}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                    tab === 'settings'
                      ? 'bg-primaryColor text-white shadow-lg shadow-primaryColor/25'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Profile Settings
                </button>
              </div>

              <div className="mt-6">
                {tab === 'bookings' && <MyBookings />}
                {tab === 'settings' && <Profile user={userData} />}
                {tab === 'insights' && <Insights />}
              </div>
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
