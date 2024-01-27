// DoctorList.jsx
import React, { useState, useEffect } from 'react';
import DoctorCard from './DoctorCard';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:500/api/v1/doctors/');
        const data = await response.json();
        setDoctors(data.data); // Update to use data.data
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor._id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
