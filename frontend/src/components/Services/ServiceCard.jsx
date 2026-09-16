import React from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const ServiceCard = ({ item, index }) => {
  const { name, desc, bgColor, textColor } = item

  return (
    <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-sm hover-lift flex flex-col justify-between transition-all duration-300">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[16px] font-[700] shadow-sm"
            style={{ 
              background: `${bgColor}`, 
              color: `${textColor}`, 
            }}
          >
            {index + 1}
          </span>
        </div>
        <h3 className="text-[22px] leading-8 text-headingColor font-[700] tracking-tight mb-3">
          {name}
        </h3>
        <p className="text-[15px] leading-6 font-[400] text-textColor">
          {desc}
        </p>
      </div>

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-50">
        <Link 
          to='/doctors' 
          className="inline-flex items-center gap-2 text-primaryColor font-[600] text-[15px] group"
        >
          <span>Consult Specialist</span>
          <span className="w-8 h-8 rounded-full bg-primaryColor/10 flex items-center justify-center group-hover:bg-primaryColor group-hover:text-white transition-all duration-200">
            <BsArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </div>
  )
}

export default ServiceCard