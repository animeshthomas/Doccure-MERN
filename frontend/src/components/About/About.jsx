import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowRight, BsAward } from 'react-icons/bs'

import aboutImg from '../../assets/images/about.png'
import aboutCardImg from '../../assets/images/about-card.png'

const About = () => {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container">
        <div className="flex justify-between items-center gap-12 lg:gap-20 flex-col lg:flex-row">

          {/*================= About Images Composition =============*/}
          <div className="relative w-full lg:w-1/2 z-10 order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-xl max-w-[480px]">
              <img src={aboutImg} alt="Healthcare professionals" className="w-full object-cover" />
            </div>

            {/* Floating Experience Card */}
            <div className="absolute z-20 bottom-4 -right-4 sm:right-6 w-[200px] sm:w-[260px] animate-floatSlow">
              <div className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-2xl border border-slate-100">
                <img src={aboutCardImg} alt="Award badge" className="w-full object-contain" />
              </div>
            </div>
          </div>

          {/*================= About Content =============*/}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <span className="text-primaryColor font-semibold text-xs tracking-wider uppercase bg-primaryColor/10 px-3 py-1 rounded-full">
              About Doccure
            </span>
            <h2 className="heading mt-3">
              Proud to be Recognized Among the Nation's Premier Healthcare Networks
            </h2>
            <p className="text__para">
              Consistently ranked among the top healthcare organizations, our platform unites board-certified physicians, modern diagnostic technologies, and empathetic patient-first care.
            </p>

            <p className="text__para mt-4">
              We strive to empower every individual with immediate access to preventative consultations, specialized therapies, and comprehensive digital health records with absolute transparency.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link to='/services'>
                <button className="btn">
                  <span>Explore Our Services</span>
                  <BsArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>  
    </section>
  )
}

export default About