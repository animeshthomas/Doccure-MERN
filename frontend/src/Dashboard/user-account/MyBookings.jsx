import React from 'react';
import { BASE_URL } from '../../config';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import useFetchData from '../../hooks/useFetchData';

const MyBookings = () => {
  const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div>
      {loading && !error && <Loading />}
      {/* {error && !loading && <Error errMessage={error} />} */}
      {error && !loading &&  <div className='flex items-center justify-center w-full h-full'>
       <center><h3 className='text-headingColor text-[20px] leading-[30px] font-semibold'>
       <br/><br/><br/><br/>  You have no appointments yet.
          </h3></center>   
        </div>}
      {!loading && !error && appointments && appointments.length > 0 && (
        <div>
          {appointments.map((appointment) => (
            <div key={appointment.id} className='flex items-center justify-between border-b border-solid border-gray-200 py-5'> 
              <div>
                <h3 className='text-headingColor text-[20px] leading-[30px] font-semibold'>
                  {appointment.doctor.name}
                </h3>
                <p className='text-textColor text-[15px] leading-6'>
                  {appointment.doctor.speciality}
                </p>
                <p className='text-textColor text-[15px] leading-6'>
                  {appointment.date}
                </p>
              </div>
              <div>
                <button className='bg-primaryColor text-white px-5 py-2 rounded-md'>
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && !error && (!appointments || appointments.length === 0) && (
        <div className='flex items-center justify-center w-full h-full'>
          <h3 className='text-headingColor text-[20px] leading-[30px] font-semibold'>
            No Appointments
          </h3>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
