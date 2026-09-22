import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowRight, BsShieldCheck, BsClockHistory, BsCameraVideoFill } from "react-icons/bs";
import { FaUserMd, FaHospital, FaCalendarCheck } from "react-icons/fa";
import { motion } from "framer-motion";

import heroImg01 from "../assets/images/hero-img01.png"
import heroImg02 from "../assets/images/hero-img02.png"
import heroImg03 from "../assets/images/hero-img03.png"
import featureImg from "../assets/images/feature-img.png"
import avatarIcon from "../assets/images/avatar-icon.png"
import faqImg from "../assets/images/faq-img.png"

import About from '../components/About/About';
import ServiceList from '../components/Services/ServiceList';
import DoctorList from '../components/Doctors/DoctorList';
import FaqList from '../components/Faq/FaqList';
import Testimonial from '../components/Testimonial/Testimonial';
import InfiniteMarquee from '../components/Common/InfiniteMarquee';
import AnimatedCounter from '../components/Common/AnimatedCounter';

const Home = () => {
  return (
    <>
      {/* =================== Hero Section ==================== */}
      <section className="relative overflow-hidden pt-[40px] lg:pt-[70px] pb-[80px] bg-gradient-to-b from-blue-50/60 via-white to-white">
        {/* Ambient Glows */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-primaryColor/10 rounded-full blur-3xl pointer-events-none -z-10 animate-floatSlow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purpleColor/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="container">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between">
            {/* Hero Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primaryColor/10 border border-primaryColor/20 text-primaryColor font-semibold text-xs tracking-wide uppercase mb-6">
                <BsShieldCheck className="w-4 h-4" /> Certified Medical Excellence
              </div>

              <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] leading-[44px] sm:leading-[56px] lg:leading-[66px] font-[800] text-headingColor tracking-tight">
                We Help Patients Live a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryColor to-irisBlueColor">Healthier, Longer</span> Life.
              </h1>

              <p className="text__para max-w-[540px]">
                Access premier healthcare specialists anytime. Book verified clinical appointments, consult with top physicians online, and streamline your medical journey seamlessly.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link to='/doctors'>
                  <button className="btn">
                    <span>Find a Doctor</span>
                    <BsArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
                <Link to='/services'>
                  <button className="btn-outline">
                    Explore Services
                  </button>
                </Link>
              </div>

              {/* Stats Counters */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 pt-8 border-t border-slate-200/60 grid grid-cols-3 gap-4 sm:gap-8 max-w-[500px]"
              >
                <div>
                  <h3 className="text-[32px] lg:text-[40px] font-[800] text-headingColor tracking-tight">
                    <AnimatedCounter to={30} /><span className="text-primaryColor">+</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Years Experience</p>
                </div>
                <div>
                  <h3 className="text-[32px] lg:text-[40px] font-[800] text-headingColor tracking-tight">
                    <AnimatedCounter to={15} /><span className="text-purpleColor">+</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Clinic Hubs</p>
                </div>
                <div>
                  <h3 className="text-[32px] lg:text-[40px] font-[800] text-headingColor tracking-tight">
                    <AnimatedCounter to={99} /><span className="text-emerald-500">%</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Patient Trust</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Right Images Composition */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 flex items-center justify-center relative"
            >
              <div className="grid grid-cols-2 gap-4 max-w-[500px]">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-3xl shadow-xl hover-lift">
                    <img className="w-full object-cover aspect-[4/5]" src={heroImg01} alt="Doctor consultation" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="overflow-hidden rounded-3xl shadow-xl hover-lift">
                    <img src={heroImg02} alt="Medical clinic" className="w-full object-cover aspect-[4/3]" />
                  </div>
                  <div className="overflow-hidden rounded-3xl shadow-xl hover-lift">
                    <img src={heroImg03} alt="Medical operation" className="w-full object-cover aspect-[4/3]" />
                  </div>
                </div>
              </div>

              {/* Floating Pill Badge */}
              <div className="absolute -bottom-4 left-6 sm:left-12 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-floatSlow">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <BsClockHistory className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Available 24/7</p>
                  <p className="text-sm font-bold text-headingColor">Instant Consultations</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================== Infinite Auto-Scrolling Marquee ==================== */}
      <InfiniteMarquee />

      {/* =================== Quick Action Steps ==================== */}
      <section className="bg-white overflow-hidden">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-[580px] mx-auto mb-14"
          >
            <span className="text-primaryColor font-semibold text-xs tracking-wider uppercase bg-primaryColor/10 px-3 py-1 rounded-full">
              Easy 3-Step Process
            </span>
            <h2 className="heading mt-3">Providing Exceptional Medical Care</h2>
            <p className="text__para">
              Experience seamless healthcare delivery from specialist discovery to digital consultations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-cardHover text-center group flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="w-20 h-20 rounded-2xl bg-blue-50 text-primaryColor flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-primaryColor group-hover:text-white transition-all duration-300 shadow-sm">
                  <FaUserMd className="w-9 h-9" />
                </div>
                <h3 className="text-[22px] font-[700] text-headingColor mb-3 group-hover:text-primaryColor transition-colors">1. Find a Doctor</h3>
                <p className="text-[15px] leading-6 text-textColor">
                  Search across top-rated specialists filtered by expertise, availability, patient ratings, and location.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  to='/doctors'
                  className="w-11 h-11 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-700 group-hover:bg-primaryColor group-hover:text-white transition-all duration-300 shadow-sm"
                >
                  <BsArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-cardHover text-center group flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="w-20 h-20 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                  <FaHospital className="w-9 h-9" />
                </div>
                <h3 className="text-[22px] font-[700] text-headingColor mb-3 group-hover:text-amber-600 transition-colors">2. Choose Location</h3>
                <p className="text-[15px] leading-6 text-textColor">
                  Select your preferred local clinic or opt for instant virtual tele-consultations from the comfort of home.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  to='/services'
                  className="w-11 h-11 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-700 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm"
                >
                  <BsArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-cardHover text-center group flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="w-20 h-20 rounded-2xl bg-purple-50 text-purpleColor flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-purpleColor group-hover:text-white transition-all duration-300 shadow-sm">
                  <FaCalendarCheck className="w-9 h-9" />
                </div>
                <h3 className="text-[22px] font-[700] text-headingColor mb-3 group-hover:text-purpleColor transition-colors">3. Book Appointment</h3>
                <p className="text-[15px] leading-6 text-textColor">
                  Reserve appointment slots with instant confirmation, digital payment processing, and calendar sync.
                </p>
              </div>

              <div className="mt-8">
                <Link
                  to='/doctors'
                  className="w-11 h-11 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-700 group-hover:bg-purpleColor group-hover:text-white transition-all duration-300 shadow-sm"
                >
                  <BsArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================== About Section ==================== */}
      <About />

      {/* =================== Medical Services Section ==================== */}
      <section className="bg-slate-50/50 overflow-hidden">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-[580px] mx-auto mb-14"
          >
            <span className="text-primaryColor font-semibold text-xs tracking-wider uppercase bg-primaryColor/10 px-3 py-1 rounded-full">
              Comprehensive Care
            </span>
            <h2 className="heading mt-3">Our Medical Services</h2>
            <p className="text__para">
              From routine wellness diagnostics to advanced clinical treatments, our medical network covers every specialization.
            </p>
          </motion.div>

          <ServiceList />
        </div>
      </section>

      {/* =================== Virtual Treatment Feature ==================== */}
      <section className="bg-white overflow-hidden">
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Feature Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-1/2"
            >
              <span className="text-primaryColor font-semibold text-xs tracking-wider uppercase bg-primaryColor/10 px-3 py-1 rounded-full">
                Telehealth & Remote Care
              </span>
              <h2 className="heading mt-3">
                Get Virtual Treatment <br /> Anytime, Anywhere.
              </h2>

              <div className="space-y-4 mt-6">
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <span className="w-7 h-7 rounded-full bg-primaryColor text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">1</span>
                  <p className="text-[15px] text-textColor leading-6">Schedule on-demand consultations with verified doctors in minutes.</p>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <span className="w-7 h-7 rounded-full bg-primaryColor text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">2</span>
                  <p className="text-[15px] text-textColor leading-6">Filter specialists accepting new patients and view verified credentials.</p>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <span className="w-7 h-7 rounded-full bg-primaryColor text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">3</span>
                  <p className="text-[15px] text-textColor leading-6">Receive digital prescriptions and personalized treatment plans directly.</p>
                </div>
              </div>

              <div className="mt-8">
                <Link to='/doctors'>
                  <button className="btn">Get Started Now</button>
                </Link>
              </div>
            </motion.div>

            {/* Feature Right Image + Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-1/2 relative flex justify-center"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-[480px]">
                <img src={featureImg} className="w-full object-cover" alt="Doctor providing remote consultation" />

                {/* Floating Telehealth Indicator Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/80 animate-floatSlow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                      <span className="text-xs font-bold text-slate-700">Live Video Consultation</span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-primaryColor/10 text-primaryColor flex items-center justify-center">
                      <BsCameraVideoFill className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                    <img src={avatarIcon} alt="Doctor avatar" className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-headingColor">Dr. Wayne Collins</h4>
                      <p className="text-[11px] text-slate-400 font-medium">Cardiology Specialist</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================== Featured Doctors ==================== */}
      <section className="bg-slate-50/50 overflow-hidden">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-[580px] mx-auto mb-14"
          >
            <span className="text-primaryColor font-semibold text-xs tracking-wider uppercase bg-primaryColor/10 px-3 py-1 rounded-full">
              Experienced Physicians
            </span>
            <h2 className="heading mt-3">Our Great Doctors</h2>
            <p className="text__para">
              Connect with top-rated medical practitioners specialized across clinical disciplines.
            </p>
          </motion.div>

          <DoctorList />
        </div>
      </section>

      {/* =================== FAQ Section ==================== */}
      <section className="bg-white overflow-hidden">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2 hidden md:block"
            >
              <div className="rounded-3xl overflow-hidden shadow-lg hover-lift max-w-[480px] mx-auto">
                <img src={faqImg} alt="Doctor with patient question" className="w-full object-cover" />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="w-full lg:w-1/2"
            >
              <span className="text-primaryColor font-semibold text-xs tracking-wider uppercase bg-primaryColor/10 px-3 py-1 rounded-full">
                Help & Answers
              </span>
              <h2 className="heading mt-3 mb-8">
                Frequently Asked Questions
              </h2>

              <FaqList />
            </motion.div>
          </div>
        </div>
      </section>

      {/* =================== Testimonial Section ==================== */}
      <section className="bg-slate-50/50 overflow-hidden">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-[580px] mx-auto mb-14"
          >
            <span className="text-primaryColor font-semibold text-xs tracking-wider uppercase bg-primaryColor/10 px-3 py-1 rounded-full">
              Patient Stories
            </span>
            <h2 className="heading mt-3">What Our Patients Say</h2>
            <p className="text__para">
              Trusted by thousands of individuals and families worldwide for their health and wellness needs.
            </p>
          </motion.div>

          <Testimonial />
        </div>
      </section>
    </>
  )
}

export default Home