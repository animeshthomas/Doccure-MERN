import React, { useContext, useState } from 'react'
import ViewDoctors from './ViewDoctors'
import ViewUsers from './ViewUsers'
import { authContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import Insights from './Insights'

const AdminProfile = () => {
    const [tab, setTab] = useState('doctors')

    const { dispatch } = useContext(authContext)
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
        toast.success('Logged out successfully')
    }

    return (
        <section>
            <div className='max-w-[1170px] px-5 mx-auto'>
                <div className="grid md:grid-cols-3 gap-10">

                    <div className="pb-[50px] px-[30px] rounded-md">
                        <div className="flex items-center justify-center">
                            <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor'>
                                <img src="https://as2.ftcdn.net/v2/jpg/04/75/00/99/1000_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi.jpg" alt="" className='w-full h-full rounded-full' />
                            </figure>
                        </div>

                        <div className="text-center mt-4">
                            <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>
                                Admin MediCare
                            </h3>
                            <p className="text-textColor text-[15px] leading-6 font-medium">
                                admin@gmail.com
                            </p>
                        </div>

                        <div className="mt-[50px] md:mt-[100px] space-y-4">
                            <button onClick={handleLogout} className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white">
                                Logout
                            </button>
                            <button className="w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white">
                                Delete account
                            </button>
                        </div>
                    </div>

                    <div className="md:col-span-2 md:px-[30px]">
                        <div>
                            <button
                                onClick={() => setTab('doctors')}
                                className={` ${tab === 'doctors' && 'bg-primaryColor text-white font-normal'}
            p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                                Verify Doctors
                            </button>

                            <button
                                onClick={() => setTab('insights')}
                                className={` ${tab === 'insights' && 'bg-primaryColor text-white font-normal'}
            p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                                View Insights
                            </button>

                            <button
                                onClick={() => setTab('users')}
                                className={` ${tab === 'users' && 'bg-primaryColor text-white font-normal'} 
            py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}>
                                View Patients
                            </button>
                        </div>

                        {tab === 'doctors' && <ViewDoctors />}
                        {tab === 'users' && <ViewUsers />}
                        {tab === 'insights' && <Insights />}

                    </div>
                </div>

            </div>
        </section>
    )
}

export default AdminProfile