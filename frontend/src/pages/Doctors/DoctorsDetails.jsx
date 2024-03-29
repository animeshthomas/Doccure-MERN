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

const DoctorsDetails = () => {
  const [tab, setTab] = useState('about')
  const { id } = useParams()
  const { data: doctor, loading, error } = useFetchData(BASE_URL + `/doctors/${id}`)
  console.log(doctor)
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
    email,
    isApproved
  } = doctor;
  const isPremiumUser = getIsPremiumUser();
  console.log(isPremiumUser);
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && <Loader />}
        {error && <Error />}
        {!loading && !error && (<div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              <figure className="max-w-[200px] max-h-[200px] relative overflow-hidden">
                <img src={photo} alt="" className="w-full h-full object-cover" />
                {averageRating > 4.5 && (
                  <div
                    className="absolute top-0 right-0 bg-red-600 text-white py-1 px-3 text-sm rounded-bl-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    title="Got 4.5+ Avarage Rating"
                  >
                    Top Rated
                  </div>
                )}
              </figure>
              <div>
                <span className="bg-[#CCF0F3] text-blue-400 py-1 px-6 lg:py-2 lg:px-6 text-[12px]
                  leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                  {specialization}
                </span>
                <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                  {name}
                </h3>
                <div className="Flex items-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                    <img src={starIcon} alt="" /> {averageRating !== undefined ? averageRating.toFixed(2) : ''}
                  </span>

                  <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400]
                  text-textColor">
                    ({totalRating})
                  </span>
                </div>

                <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                  {bio}
                </p>

              </div>
            </div>

            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <button
                onClick={() => setTab('about')}
                className={`${tab === 'about' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                About
              </button>

              {isPremiumUser === true && (
                <button
                  onClick={() => setTab('chat')}
                  className={`${tab === 'chat' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  Chat (Premium Only)
                </button>
              )}

              <button
                onClick={() => setTab('feedback')}
                className={`${tab === 'feedback' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                Feedback
              </button>
            </div>

            <div className="mt-[50px]">
              {
                tab === 'about' && <DoctorsAbout name={name} qualifications={qualifications} experiences={experiences} about={about} />
              }
              {
                tab === 'feedback' && <Feedback reviews={reviews} totalRating={totalRating} />
              }
              {isPremiumUser === true && tab === 'chat' && (
                <Chat doctorId={id} />
              )}


            </div>

          </div>



          <div>
            <SidePanel doctorId={doctor._id} ticketPrice={ticketPrice} timeSlots={timeSlots} isApproved={isApproved} />
          </div>
        </div>)}
      </div>
    </section>
  )
}

export default DoctorsDetails