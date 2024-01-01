import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import starIcon from '../../assets/images/Star.png';
import { BsArrowRight } from 'react-icons/bs';

const DoctorCard = ({ doctor }) => {
    const { name, avgRating, totalRating, photo, specialization, totalPatients, hospital } = doctor;
    return (
        <div className="p-3 lg:p-5">
            <div>
                <img src={photo} alt={name} className="w-full" />
            </div>
            <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">
                {name}
            </h2>
            <div className="mt-2 lg:mt-4 flex items-center justify-between">
                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">{specialization}</span>
                <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor ml-1 lg:ml-2">
                        <img src={starIcon} alt="star" className="w-4 h-4 lg:w-5 lg:h-5" /> {avgRating}</span>
                    <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">({totalRating})</span>
                </div>
            </div>
            <div className="mt-[18px] lg:mt-5 flex flex-col lg:flex-row items-start lg:items-center justify-between relative">
                <div>
                    <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-bold text-headingColor">
                        +{totalPatients} Patients
                    </h3>
                    <p className="text-[14px] leading-6 font-[400] text-textColor">At {hospital}</p>
                </div>
                <Link to="/doctors" className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] absolute top-0 right-0 mt-[15px] lg:mt-0 mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                    <BsArrowRight className='group-hover:text-white w-6 h-5' />
                </Link>
            </div>

        </div>
    );
};

export default DoctorCard;
