import React from 'react'
import useFetchData from '../../hooks/useFetchData'
import { BASE_URL } from '../../config'
import DoctorCard from './../../components/Doctors/DoctorCard'
import Loading from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'
const ViewDoctors = () => {
  const {data:doctors, loading} = useFetchData(`${BASE_URL}/doctors/unapproved`)
  return (
    <div>
    {loading && <Loading/>}
    { !loading &&<Error errMessage/>}
    {!loading &&  (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
     {
       doctors.map(doctor =>(
         <DoctorCard doctor={doctor} key={doctor._id}/>
       ))
     }
     </div>
     )}
     {!loading  && doctors.length==0 &&  <h2 className='mt-5 text-center text-primaryColor text-[20px] leading-7 font-semibold'>No Doctors To Verify</h2>}
 </div>
  )
}

export default ViewDoctors