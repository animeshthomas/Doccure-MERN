import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { BiEnvelope, BiPhoneCall, BiMapPin } from 'react-icons/bi'
import { BsSendFill } from 'react-icons/bs'
import { motion } from 'framer-motion'

const Contact = () => {
  const [formData, setFormData] = useState({ email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      toast.success('Thank you! Your message has been sent successfully.')
      setFormData({ email: '', subject: '', message: '' })
    }, 800)
  }

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-b from-blue-50/50 via-white to-white overflow-hidden">
      <div className="container max-w-screen-xl">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-[600px] mx-auto mb-14"
        >
          <span className="text-primaryColor font-semibold text-xs tracking-wider uppercase bg-primaryColor/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Get in Touch
          </span>
          <h1 className="heading">We're Here to Help</h1>
          <p className="text__para">
            Have questions regarding clinical appointments, prescriptions, or technical assistance? Our support team is available 24/7.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Quick Contact Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover-lift flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primaryColor/10 text-primaryColor flex items-center justify-center flex-shrink-0">
                <BiEnvelope className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-headingColor text-base">Email Us</h4>
                <p className="text-xs text-slate-400 mt-0.5">Quick inquiries & feedback</p>
                <p className="text-sm font-semibold text-primaryColor mt-1">support@doccure.com</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover-lift flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <BiPhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-headingColor text-base">Emergency Line</h4>
                <p className="text-xs text-slate-400 mt-0.5">24/7 Urgent assistance</p>
                <p className="text-sm font-semibold text-emerald-600 mt-1">+1 (800) 456-7890</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover-lift flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purpleColor flex items-center justify-center flex-shrink-0">
                <BiMapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-headingColor text-base">Headquarters</h4>
                <p className="text-xs text-slate-400 mt-0.5">Central Clinical Center</p>
                <p className="text-sm font-medium text-slate-700 mt-1">104 Medical Plaza, New York</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="form__label">Your Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="name@example.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form__input"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="form__label">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  placeholder="How can we assist you?" 
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form__input"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="form__label">Your Message</label>
                <textarea 
                  rows="5" 
                  id="message" 
                  placeholder="Write your detailed query or message here..." 
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form__input resize-none"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="btn w-full sm:w-auto px-8"
              >
                <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
                <BsSendFill className="w-4 h-4 ml-1" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact