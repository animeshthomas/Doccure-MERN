import React, { useState } from 'react';
import doctorimg from '../../assets/images/doctor-img02.png';
import starIcon from '../../assets/images/star.png';
import DoctorAbout from './DoctorAbout';
import FeedBack from './FeedBack';

const DoctorDetails = () => {
  const [tab, setTab] = useState('about'); // Corrected the typo here

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              <figure className='max-w-[200px]  max-h-[200px]'>
                <img src={doctorimg} alt="" className='w-full' />
              </figure>
              <div>
                <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                  Cardiology
                </span>
                <h3 className='text-headingColor text-[22px] leading-9 mt-3 font-bold'>
                  Dr. John Doe
                </h3>
                <div className="flex items-center gap-[6px]">
                  <span className="flex items-center text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                    <img src={starIcon} alt="" /> 4.8
                  </span>
                  <span className='text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>
                    (272)
                  </span>
                </div>
                <p className="text_para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>

            <div className='mt-[50px] border-b border-solid border-[#0066ff34]'>
              <button className={`${tab === 'about' && 'border-b border-solid border-primaryColor'}py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`} onClick={() => setTab('about')}>About</button>
              <button className={`${tab === 'feedback' && 'border-b border-solid border-primaryColor'}py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`} onClick={() => setTab('feedback')}>Feedback</button>
            </div>
            <div className='mt-[50px]'>
              {tab === 'about'  && <DoctorAbout />}
              {tab === 'feedback'  && <FeedBack />}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;
