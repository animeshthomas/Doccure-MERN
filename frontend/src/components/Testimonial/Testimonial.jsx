import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

import patientAvatar from "../../assets/images/patient-avatar.png"
import { HiStar } from 'react-icons/hi'

const testimonialsData = [
  {
    name: "Jacob Mathew",
    rating: 5,
    text: "I have taken medical services from them. They treat so well and they are providing the best medical services.",
  },
  {
    name: "Animesh Thomas",
    rating: 5,
    text: "Very good service. The online consultation was smooth, quick, and prescription was sent immediately. I will recommend to everyone.",
  },
  {
    name: "Jesma James",
    rating: 5,
    text: "Doctor was very attentive and listened to all my symptoms with great care. The clinic staff was polite and helpful.",
  },
  {
    name: "Libin Jacob",
    rating: 5,
    text: "Exceptional platform for booking medical appointments. No waiting lines and verified top-tier specialists.",
  },
];

const Testimonial = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className="mt-[30px] lg:mt-[55px]"
    >
      <Swiper 
        modules={[Pagination]} 
        spaceBetween={24} 
        slidesPerView={1} 
        pagination={{ clickable: true }}
        breakpoints={{ 
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {testimonialsData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-100/90 shadow-sm hover:shadow-cardHover transition-all duration-300 mb-10 flex flex-col justify-between h-[210px]">
              <div className="flex items-center gap-3.5">
                <img src={patientAvatar} alt={item.name} className="w-12 h-12 rounded-full object-cover border-2 border-primaryColor/20" />
                <div>
                  <h4 className="text-[17px] font-bold text-headingColor tracking-tight">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <HiStar key={i} className="text-amber-400 w-4 h-4" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-[14px] sm:text-[15px] leading-6 text-textColor font-[400] italic mt-4 line-clamp-3">
                "{item.text}"
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  )
}

export default Testimonial