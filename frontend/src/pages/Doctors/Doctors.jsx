import React, { useState, useEffect } from 'react';
import DoctorCard from '../../components/Doctors/DoctorCard';
import Testimonial from '../../components/Testimonial/Testimonial';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update the API URL to include the search query
        const response = await fetch(`http://localhost:500/api/v1/doctors/?query=${searchQuery}`);
        const data = await response.json();
        setDoctors(data.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchData();
  }, [searchQuery]); // Include searchQuery as a dependency for the useEffect

  const handleSearch = async () => {
    try {
      // Update the API URL to include the search query
      const response = await fetch(`http://localhost:500/api/v1/doctors/?query=${searchQuery}`);
      const data = await response.json();
      setDoctors(data.data);
    } catch (error) {
      console.error('Error searching doctors:', error);
    }
  };

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>

          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center 
              justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none 
                  cursor-pointer placeholder:text-textColor"
              placeholder="Search Doctor"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto ">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health system offers unmatched, expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
