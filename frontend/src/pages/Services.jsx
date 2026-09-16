import React from 'react'
import { services } from '../assets/data/services'
import ServiceCard from '../components/Services/ServiceCard'
import { FaStethoscope } from 'react-icons/fa'

const Services = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-50/70 to-white py-12 lg:py-16">
        <div className="container text-center max-w-[700px] mx-auto">
          <span className="text-primaryColor font-semibold text-xs tracking-wider uppercase bg-primaryColor/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
            <FaStethoscope className="w-3.5 h-3.5" /> Departmental Care
          </span>
          <h1 className="heading">Specialized Healthcare Services</h1>
          <p className="text__para max-w-[540px] mx-auto">
            Explore clinical treatments, diagnostic screenings, and ongoing therapies offered across our comprehensive medical network.
          </p>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((item, index) => (
              <ServiceCard item={item} index={index} key={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Services