import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/images/logo.png"
import { RiLinkedinFill } from 'react-icons/ri'
import { AiFillYoutube, AiFillGithub, AiOutlineInstagram } from 'react-icons/ai'

const socialLinks = [
  {
    path: "https://www.youtube.com/@animeshthomas3288",
    icon: <AiFillYoutube className="w-5 h-5 transition-transform group-hover:scale-110" />,
  },
  {
    path: "https://github.com/animeshthomas",
    icon: <AiFillGithub className="w-5 h-5 transition-transform group-hover:scale-110" />,
  },
  {
    path: "https://www.instagram.com/animesh.thomas/",
    icon: <AiOutlineInstagram className="w-5 h-5 transition-transform group-hover:scale-110" />,
  },
  {
    path: "https://www.linkedin.com/in/animesh-thomas/",
    icon: <RiLinkedinFill className="w-5 h-5 transition-transform group-hover:scale-110" />,
  },
];

const quickLinks01 = [
  { path: "/home", display: "Home" },
  { path: "/doctors", display: "Find Doctors" },
  { path: "/services", display: "Medical Services" },
  { path: "/contact", display: "Contact Support" },
]

const quickLinks02 = [
  { path: "/doctors", display: "Book an Appointment" },
  { path: "/services", display: "Our Specializations" },
  { path: "/contact", display: "Emergency Care" },
]

const quickLinks03 = [
  { path: "/contact", display: "Help Center" },
  { path: "/contact", display: "Feedback & Inquiries" },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="pt-16 pb-12 bg-white border-t border-slate-100 transition-colors">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link to="/home" className="inline-block mb-4 transform hover:scale-105 transition-transform">
              <img src={logo} alt="Doccure Logo" className="h-[44px] object-contain" />
            </Link>
            <p className="text-[15px] leading-7 text-textColor max-w-[360px] mb-6">
              World-class healthcare scheduling and clinical consulting platform designed to connect patients with certified medical practitioners effortlessly.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((link, index) => (
                <a
                  href={link.path}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-white hover:bg-primaryColor hover:border-primaryColor transition-all duration-300 shadow-sm group"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[17px] font-[700] mb-5 text-headingColor tracking-tight">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks01.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="text-[15px] text-textColor hover:text-primaryColor transition-colors duration-200 hover:translate-x-1 inline-block transform"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[17px] font-[700] mb-5 text-headingColor tracking-tight">
              Patient Care
            </h3>
            <ul className="space-y-3">
              {quickLinks02.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="text-[15px] text-textColor hover:text-primaryColor transition-colors duration-200 hover:translate-x-1 inline-block transform"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[17px] font-[700] mb-5 text-headingColor tracking-tight">
              Support
            </h3>
            <ul className="space-y-3">
              {quickLinks03.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="text-[15px] text-textColor hover:text-primaryColor transition-colors duration-200 hover:translate-x-1 inline-block transform"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[14px] text-slate-500 gap-4">
          <p>© {year} Doccure Healthcare Systems. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-primaryColor transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-primaryColor transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-primaryColor transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer