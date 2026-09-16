import React from 'react'
import starIcon from "../../assets/images/Star.png"
import { Link } from "react-router-dom"
import { BsArrowRight } from 'react-icons/bs'

const DoctorCard = ({ doctor }) => {
  const { name, averageRating, totalRating, photo, specialization, experiences } = doctor

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm hover-lift transition-all duration-300 group flex flex-col justify-between">
      <div>
        <div className="relative overflow-hidden rounded-xl bg-slate-100 aspect-[4/3] sm:aspect-square mb-4">
          <img 
            src={photo || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80"} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            alt={name} 
          />
          {averageRating > 4.5 && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-semibold py-1 px-3 rounded-full shadow-md">
              ★ Top Rated
            </div>
          )}
        </div>

        <h3 className="text-[19px] sm:text-[22px] font-[700] text-headingColor tracking-tight group-hover:text-primaryColor transition-colors duration-200">
          {name}
        </h3>

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="bg-primaryColor/10 text-primaryColor py-1 px-3 text-[13px] font-semibold rounded-full">
            {specialization || "General Medicine"}
          </span>

          <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100/60">
            <img src={starIcon} alt="Rating star" className="w-3.5 h-3.5" />
            <span className="text-[13px] font-bold text-slate-800">
              {Number(averageRating || 0).toFixed(1)}
            </span>
            <span className="text-[12px] text-slate-400 font-normal">
              ({totalRating || 0})
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
        <div>
          <p className="text-[13px] text-slate-500 font-medium">
            {experiences && experiences[0]?.hospital ? `At ${experiences[0].hospital}` : 'Doccure Medical Center'}
          </p>
        </div>

        <Link
          to={`/doctors/${doctor._id}`}
          className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-primaryColor group-hover:text-white transition-all duration-300 shadow-sm"
          aria-label={`View details for ${name}`}
        >
          <BsArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}

export default DoctorCard