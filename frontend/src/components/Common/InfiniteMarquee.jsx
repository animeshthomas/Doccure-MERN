import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaBrain, FaBaby, FaBone, FaEye, FaStethoscope, FaUserShield, FaPrescriptionBottleAlt } from 'react-icons/fa';

const items = [
  { label: 'Cardiology Care', icon: FaHeartbeat, color: 'text-rose-500' },
  { label: 'Neurology Center', icon: FaBrain, color: 'text-purple-500' },
  { label: 'Pediatrics Wing', icon: FaBaby, color: 'text-amber-500' },
  { label: 'Orthopedic Surgery', icon: FaBone, color: 'text-emerald-500' },
  { label: 'Ophthalmology', icon: FaEye, color: 'text-cyan-500' },
  { label: 'General Medicine', icon: FaStethoscope, color: 'text-blue-500' },
  { label: 'Verified Physicians', icon: FaUserShield, color: 'text-indigo-500' },
  { label: 'E-Prescriptions', icon: FaPrescriptionBottleAlt, color: 'text-teal-500' },
];

const InfiniteMarquee = () => {
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden py-5 bg-slate-900 text-white border-y border-slate-800 relative select-none">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center gap-6 sm:gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 28,
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {duplicatedItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-slate-800/90 border border-slate-700/70 text-[13px] sm:text-[14px] font-semibold text-slate-200 tracking-wide backdrop-blur-sm hover:border-primaryColor/60 transition-all hover:scale-105 cursor-default"
            >
              <Icon className={`w-4 h-4 ${item.color}`} />
              <span>{item.label}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default InfiniteMarquee;