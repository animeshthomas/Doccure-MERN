import React, { useEffect, useState } from 'react';
import DoctorCard from '../../components/Doctors/DoctorCard';
import Testimonial from '../../components/Testimonial/Testimonial';
import useFetchData from '../../hooks/useFetchData';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { BASE_URL } from '../../config';
import { BiSearch } from 'react-icons/bi';
import { FaUserMd } from 'react-icons/fa';

const SPECIALTIES = ["All", "Surgeon", "Neurologist", "Dermatologist", "Cardiologist", "Pediatrician"];

const Doctors = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const handleSearch = () => {
    setQuery(query.trim());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timeout);
  }, [query]);

  const { data: doctors, loading, error } = useFetchData(BASE_URL + `/doctors?query=${debouncedQuery}`);

  const filteredDoctors = doctors?.filter(doc => {
    if (selectedSpecialty === "All") return true;
    return doc.specialization?.toLowerCase().includes(selectedSpecialty.toLowerCase());
  }) || [];

  return (
    <>
      {/* Search Header Banner */}
      <section className="bg-gradient-to-b from-blue-50/70 to-white py-12 lg:py-16">
        <div className="container text-center max-w-[720px] mx-auto">
          <span className="text-primaryColor font-semibold text-xs tracking-wider uppercase bg-primaryColor/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Find Specialists
          </span>
          <h1 className='heading'>Search Verified Doctors</h1>
          <p className="text__para max-w-[520px] mx-auto">
            Book consultations with certified medical professionals tailored to your clinical needs.
          </p>

          {/* Search Input Bar */}
          <div className="mt-8 bg-white p-2 rounded-2xl shadow-xl border border-slate-200/80 flex items-center justify-between gap-2 max-w-[580px] mx-auto transition-all focus-within:ring-4 focus-within:ring-primaryColor/10 focus-within:border-primaryColor">
            <div className="flex items-center gap-3 pl-3 flex-grow">
              <BiSearch className="w-6 h-6 text-slate-400 flex-shrink-0" />
              <input
                type="search"
                className="w-full py-2.5 text-[15px] bg-transparent text-headingColor focus:outline-none placeholder:text-slate-400 font-medium"
                placeholder="Search by doctor name or condition..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button 
              className="bg-primaryColor hover:bg-primaryDark text-white px-6 py-3 rounded-xl font-semibold text-[15px] transition-all shadow-cardGlow hover:shadow-cardHover flex-shrink-0"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {/* Quick Specialty Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 mt-6">
            {SPECIALTIES.map(spec => (
              <button
                key={spec}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                  selectedSpecialty === spec
                    ? "bg-primaryColor text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
                onClick={() => {
                  setSelectedSpecialty(spec);
                  if (spec !== "All") setQuery(spec);
                  else setQuery("");
                }}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-12 bg-white">
        <div className="container">
          {loading && (
            <div className="py-16 flex justify-center">
              <Loader />
            </div>
          )}

          {error && <Error errMessage={error} />}

          {!loading && !error && filteredDoctors.length === 0 && (
            <div className="text-center py-16 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                <FaUserMd className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-headingColor">No doctors found</h3>
              <p className="text-slate-500 text-sm mt-2">
                Try adjusting your search query or selecting a different medical specialization.
              </p>
            </div>
          )}

          {!loading && !error && filteredDoctors.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fadeIn">
              {filteredDoctors.map(doctor => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50/50 py-16">
        <div className="container">
          <div className="text-center max-w-[500px] mx-auto mb-12">
            <span className="text-primaryColor font-semibold text-xs tracking-wider uppercase bg-primaryColor/10 px-3 py-1 rounded-full">
              Patient Feedback
            </span>
            <h2 className="heading mt-2">What Our Patients Say</h2>
            <p className="text__para">
              Real reviews and verified clinical experiences from individuals across the network.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
