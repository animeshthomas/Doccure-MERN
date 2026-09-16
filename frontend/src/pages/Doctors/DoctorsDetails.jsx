import React, { useState } from 'react'
import starIcon from '../../assets/images/Star.png'
import DoctorsAbout from './DoctorsAbout'
import Feedback from './Feedback'
import SidePanel from './SidePanel'
import useFetchData from '../../hooks/useFetchData'
import Loader from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'
import { BASE_URL, getIsPremiumUser } from '../../config'
import { useParams } from 'react-router-dom'
import Chat from './Chat'
import { BsShieldCheck } from 'react-icons/bs'

const DoctorsDetails = () => {
  const [tab, setTab] = useState('about')
  const { id } = useParams()
  const { data: doctor, loading, error } = useFetchData(BASE_URL + `/doctors/${id}`)

  const {
    name,
    qualifications,
    experiences,
    timeSlots,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    ticketPrice,
    photo,
    isApproved
  } = doctor || {};

  const isPremiumUser = getIsPremiumUser();

  return (
    <section className="py-10 lg:py-16 bg-gradient-to-b from-blue-50/40 via-white to-white">
      <div className="container max-w-[1240px]">
        {loading && (
          <div className="py-20 flex justify-center">
            <Loader />
          </div>
        )}

        {error && <Error errMessage={error} />}

        {!loading && !error && doctor && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column (Doctor Profile & Tabs) */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 shadow-md">
                  <img 
                    src={photo || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80"} 
                    alt={name} 
                    className="w-full h-full object-cover" 
                  />
                  {averageRating > 4.5 && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[11px] font-bold py-0.5 px-2.5 rounded-full shadow">
                      Top Rated
                    </div>
                  )}
                </div>

                <div className="text-center sm:text-left flex-grow">
                  <span className="bg-primaryColor/10 text-primaryColor py-1 px-3 text-xs font-semibold rounded-full inline-block mb-2">
                    {specialization || "General Medicine"}
                  </span>
                  
                  <h1 className="text-2xl sm:text-3xl font-[800] text-headingColor tracking-tight">
                    {name}
                  </h1>

                  <div className="flex items-center justify-center sm:justify-start gap-3 mt-2.5">
                    <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                      <img src={starIcon} alt="Star rating" className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold text-slate-800">
                        {averageRating !== undefined ? Number(averageRating).toFixed(1) : '5.0'}
                      </span>
                      <span className="text-xs text-slate-400 font-normal">
                        ({totalRating || 0})
                      </span>
                    </div>

                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      <BsShieldCheck className="w-3.5 h-3.5" /> Board Certified
                    </span>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed mt-4">
                    {bio || "Dedicated healthcare practitioner committed to providing high-standard medical care, personalized diagnostics, and evidence-based clinical consultations."}
                  </p>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="mt-8 flex items-center gap-2 border-b border-slate-200 pb-2">
                <button
                  onClick={() => setTab('about')}
                  className={`py-2 px-5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    tab === 'about'
                      ? 'bg-primaryColor text-white shadow-cardGlow'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  About Doctor
                </button>

                <button
                  onClick={() => setTab('feedback')}
                  className={`py-2 px-5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    tab === 'feedback'
                      ? 'bg-primaryColor text-white shadow-cardGlow'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Patient Feedback ({totalRating || 0})
                </button>

                {isPremiumUser === true && (
                  <button
                    onClick={() => setTab('chat')}
                    className={`py-2 px-5 rounded-full text-sm font-semibold transition-all duration-200 ${
                      tab === 'chat'
                        ? 'bg-purpleColor text-white shadow-cardGlow'
                        : 'text-purpleColor bg-purple-50 hover:bg-purple-100'
                    }`}
                  >
                    💬 Live Chat (Premium)
                  </button>
                )}
              </div>

              {/* Tab Content Box */}
              <div className="mt-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm animate-fadeIn">
                {tab === 'about' && (
                  <DoctorsAbout 
                    name={name} 
                    qualifications={qualifications} 
                    experiences={experiences} 
                    about={about} 
                  />
                )}
                {tab === 'feedback' && (
                  <Feedback reviews={reviews} totalRating={totalRating} />
                )}
                {isPremiumUser === true && tab === 'chat' && (
                  <Chat doctorId={id} />
                )}
              </div>
            </div>

            {/* Right Column (SidePanel) */}
            <div className="lg:col-span-1">
              <SidePanel 
                doctorId={doctor._id} 
                ticketPrice={ticketPrice} 
                timeSlots={timeSlots} 
                isApproved={isApproved} 
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default DoctorsDetails