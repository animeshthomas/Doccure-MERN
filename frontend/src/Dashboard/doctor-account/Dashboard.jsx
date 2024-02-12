import React, { useState } from 'react';

import useGetProfile from '../../hooks/useFetchData'
import { BASE_URL } from '../../config'
import Loading from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'
import Tabs from './Tabs'
import starIcon from '../../assets/images/Star.png'
import DoctorsAbout from '../../pages/Doctors/DoctorsAbout'
import Profile from './Profile';
import Appointments from './Appointments';


const Dashboard = () => {
  const { data, loading, error } = useGetProfile(BASE_URL + '/doctors/profile/me')
  const [tab, setTab] = useState('overview')

  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}
        {
          !loading && !error && <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
            <Tabs tab={tab} setTab={setTab} />
            <div className='lg:col-span-2'>
              {data.isApproved === 'pending' && (
                <div className='flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg'>
                  <svg
                    aria-hidden="true"
                    className='flex-shrink-0 w-5 h-5'
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
                  <span className='sr-only'>Info</span>
                  <div className='ml-3 text-large font-medium'>
                    To get approval please complete your profile. We&apos;ll review manually and approve within 3days.
                  </div>
                </div>
              )}
              <div className='mt-8'>
                {tab === 'overview' && <div>
                  <div className='flex items-center gap-4 mb-10'>\
                    <figure className='max-w-[200px] max-h-[200px]'>
                      <img src={data?.photo} alt='' className='w-full' />
                    </figure>
                    <div>
                      <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold'>
                        {data?.specialization}
                      </span>
                      <h3 className='text-[24px] leading-8 font-bold text-headingColor'>
                        {data?.name}
                      </h3>
                      <p className='text-[15px] leading-6 text-headingColor'>
                        {data?.email}
                      </p>
                      <div className='flex items-center gap-[6px]'>
                        <span className='flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg-leading-6 font-semibold'>
                          <img src={starIcon} alt="" />
                          {data.averageRating !== undefined ? data.averageRating.toFixed(2) : ''}
                        </span>
                        <span className='text-textColor text-[14px]
                      leading-5 lg:text-[16px] lg-leading-6 font-semibold'>
                          ({data.totalRating} reviews)
                        </span>
                      </div>
                      <p className='text__para font-[15px] lg:max-w-[390px] leading-6'>
                        {data?.bio}
                      </p>

                    </div>
                  </div>
                  <DoctorsAbout name={data.name} about={data.about} qualifications={data.qualifications}
                   experiences={data.experiences} />
                  
                </div>}
                {tab === 'appointments' && <Appointments appointments={data.appointments}/>}
                {tab === 'settings' && <Profile doctorData={data} />}
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  )
}

export default Dashboard