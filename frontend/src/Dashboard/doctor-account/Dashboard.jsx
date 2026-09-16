import React, { useState } from 'react';
import useGetProfile from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import Tabs from './Tabs';
import starIcon from '../../assets/images/Star.png';
import DoctorsAbout from '../../pages/Doctors/DoctorsAbout';
import Profile from './Profile';
import Appointments from './Appointments';
import ViewChats from './ViewChats'; // Import the ViewChats component

const Dashboard = () => {
    const { data, loading, error } = useGetProfile(BASE_URL + '/doctors/profile/me');
    const [tab, setTab] = useState('overview');

    return (
        <section className="py-12 bg-slate-50/50 min-h-[calc(100vh-80px)]">
            <div className='max-w-[1200px] px-4 sm:px-6 mx-auto'>
                {loading && !error && <Loading />}
                {error && !loading && <Error errMessage={error} />}
                {!loading && !error && (
                    <div className='grid lg:grid-cols-3 gap-8'>
                        <Tabs tab={tab} setTab={setTab} />
                        <div className='lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl'>
                            {data.isApproved === 'pending' && (
                                <div className='flex items-center gap-3 p-4 mb-6 text-amber-900 bg-amber-50/80 border border-amber-200/60 rounded-2xl text-sm'>
                                    <svg
                                        aria-hidden="true"
                                        className='flex-shrink-0 w-5 h-5 text-amber-600'
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm1-6a1 1 0 00-2 0v3a1 1 0 102 0v-3zm0-2a1 1 0 00-2 0h2a1 1 0 000-2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <div className='font-medium'>
                                        To get verified approval please complete your profile details. Our medical board will review within 3 business days.
                                    </div>
                                </div>
                            )}
                            <div>
                                {tab === 'overview' && (
                                    <div className="animate-fadeIn">
                                        <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b border-slate-100'>
                                            <figure className='w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-md border border-slate-100 flex-shrink-0'>
                                                <img src={data?.photo} alt='' className='w-full h-full object-cover' />
                                            </figure>
                                            <div className="text-center sm:text-left">
                                                <span className='inline-block bg-primaryColor/10 text-primaryColor font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-2'>
                                                    {data?.specialization || 'Specialist'}
                                                </span>
                                                <h3 className='text-[22px] sm:text-[26px] font-[800] text-headingColor tracking-tight'>
                                                    {data?.name}
                                                </h3>
                                                <p className='text-slate-500 text-sm font-medium mt-0.5'>
                                                    {data?.email}
                                                </p>
                                                <div className='flex items-center justify-center sm:justify-start gap-1.5 mt-2'>
                                                    <img src={starIcon} alt="" className="w-4 h-4" />
                                                    <span className='text-headingColor text-sm font-bold'>
                                                        {data.averageRating !== undefined ? data.averageRating.toFixed(1) : '5.0'}
                                                    </span>
                                                    <span className='text-slate-400 text-xs'>
                                                        ({data.totalRating || 0} reviews)
                                                    </span>
                                                </div>
                                                {data?.bio && (
                                                    <p className='text-slate-600 text-sm mt-3 leading-relaxed max-w-xl'>
                                                        {data?.bio}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <DoctorsAbout name={data.name} about={data.about} qualifications={data.qualifications} experiences={data.experiences} />
                                    </div>
                                )}
                                {tab === 'appointments' && <Appointments appointments={data.appointments} />}
                                {tab === 'chat' && <ViewChats />}
                                {tab === 'settings' && <Profile doctorData={data} />}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Dashboard;
