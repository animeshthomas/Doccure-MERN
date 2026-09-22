import React from 'react'
import { services } from '../assets/data/services'
import ServiceCard from '../components/Services/ServiceCard'
import { FaStethoscope } from 'react-icons/fa'
import { motion } from 'framer-motion'
import InfiniteMarquee from '../components/Common/InfiniteMarquee'

const Services = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-50/70 via-white to-white py-12 lg:py-16 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container text-center max-w-[700px] mx-auto"
        >
          <span className="text-primaryColor font-semibold text-xs tracking-wider uppercase bg-primaryColor/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3">
            <FaStethoscope className="w-3.5 h-3.5" /> Departmental Care
          </span>
          <h1 className="heading">Specialized Healthcare Services</h1>
          <p className="text__para max-w-[540px] mx-auto">
            Explore clinical treatments, diagnostic screenings, and ongoing therapies offered across our comprehensive medical network.
          </p>
        </motion.div>
      </section>

      <InfiniteMarquee />

      <section className="bg-white py-14">
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