import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import uploadImageToCloudinary from '../utils/uploadCloudinary'
import { BASE_URL } from "../config.js"
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader.js'
import { BiUser, BiEnvelope, BiLockAlt, BiImageAdd } from 'react-icons/bi'
import signupImg from "../assets/images/signup.gif"

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewURL, setPreviewURL] = useState("")
  const [loading, setLoading] = useState(false)
  const [uploadingImg, setUploadingImg] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [nameError, setNameError] = useState('')
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: 'patient'
  })

  const navigate = useNavigate()

  const validatePassword = (password) => {
    setPasswordError('')
    if (!/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/.test(password)) {
      setPasswordError('Password must be at least 8 characters with at least one letter and one number.')
    }
  }

  const validateName = (name) => {
    if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name)) {
      setNameError('Please enter a valid full name.')
    } else {
      setNameError('')
    }
  }

  const validateEmail = (email) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address.')
    } else {
      setEmailError('')
    }
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    if (name === 'password') validatePassword(value)
    if (name === 'name') validateName(value)
    if (name === 'email') validateEmail(value)
    setFormData({ ...formData, [name]: value })
  }

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setUploadingImg(true)
    try {
      const data = await uploadImageToCloudinary(file)
      setPreviewURL(data.url)
      setSelectedFile(data.url)
      setFormData({ ...formData, photo: data.url })
      toast.success('Profile photo uploaded!')
    } catch (err) {
      toast.error('Failed to upload image')
    } finally {
      setUploadingImg(false)
    }
  }

  const submitHandler = async event => {
    event.preventDefault()
    setLoading(true)

    if (passwordError || emailError || nameError) {
      setLoading(false)
      toast.error('Please correct the validation errors before submitting.')
      return
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const { message } = await res.json()

      if (!res.ok) {
        throw new Error(message)
      }

      setLoading(false)
      toast.success(message)
      navigate('/login')

    } catch (err) {
      toast.error(err.message)
      setLoading(false)
    }
  }

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-b from-blue-50/50 via-white to-white">
      <div className="container max-w-[1080px]">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Visual Illustration */}
          <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-primaryColor to-irisBlueColor p-12 text-white relative overflow-hidden">
            <div className="relative z-10 text-center max-w-sm">
              <span className="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
                Join Doccure Network
              </span>
              <h2 className="text-3xl font-[800] leading-tight mb-4">
                Connecting Patients with World-Class Healthcare
              </h2>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Register as a patient to schedule fast consultations, or register as a certified doctor to expand your digital clinic practice.
              </p>
            </div>
            <img src={signupImg} alt="Healthcare signup" className="w-64 rounded-2xl shadow-lg relative z-10" />
            <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-white/10 rounded-full blur-2xl"></div>
          </div>

          {/* Right Form Card */}
          <div className="p-8 sm:p-12">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-[800] text-headingColor tracking-tight">
                Create an <span className="text-primaryColor">Account</span>
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Enter your details below to get started with Doccure.
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label className="form__label">Full Name</label>
                <div className="relative flex items-center">
                  <BiUser className="absolute left-3.5 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Dr. John Doe / Jane Smith"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form__input pl-11"
                    required
                  />
                </div>
                {nameError && <p className="text-rose-500 text-xs mt-1 font-medium">{nameError}</p>}
              </div>

              <div>
                <label className="form__label">Email Address</label>
                <div className="relative flex items-center">
                  <BiEnvelope className="absolute left-3.5 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form__input pl-11"
                    required
                  />
                </div>
                {emailError && <p className="text-rose-500 text-xs mt-1 font-medium">{emailError}</p>}
              </div>

              <div>
                <label className="form__label">Password</label>
                <div className="relative flex items-center">
                  <BiLockAlt className="absolute left-3.5 text-slate-400 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="At least 8 characters (letters & numbers)"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form__input pl-11"
                    required
                  />
                </div>
                {passwordError && <p className="text-rose-500 text-xs mt-1 font-medium">{passwordError}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="form__label">I am a:</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="form__input py-2.5 font-semibold text-slate-700"
                    required
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>

                <div>
                  <label className="form__label">Gender:</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="form__input py-2.5 font-semibold text-slate-700"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Photo Upload Area */}
              <div className="pt-2">
                <label className="form__label">Profile Picture</label>
                <div className="flex items-center gap-4">
                  {selectedFile ? (
                    <figure className="w-14 h-14 rounded-full ring-2 ring-primaryColor overflow-hidden flex-shrink-0 shadow-sm">
                      <img src={previewURL} alt="Uploaded profile" className="w-full h-full object-cover" />
                    </figure>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                      <BiUser className="w-7 h-7" />
                    </div>
                  )}

                  <div className="relative">
                    <input
                      type="file"
                      name="photo"
                      id="customFile"
                      onChange={handleFileInputChange}
                      accept=".jpg,.png,.jpeg"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <label 
                      htmlFor="customFile"
                      className="btn-outline text-xs py-2.5 px-4 cursor-pointer inline-flex items-center gap-2"
                    >
                      <BiImageAdd className="w-4 h-4" />
                      <span>{uploadingImg ? "Uploading..." : selectedFile ? "Change Photo" : "Upload Photo"}</span>
                    </label>
                  </div>
                </div>
              </div>

              <button
                disabled={loading || uploadingImg}
                type="submit"
                className="btn w-full py-3.5 mt-6 text-[16px]"
              >
                {loading ? <HashLoader size={25} color="#ffffff" /> : "Complete Registration"}
              </button>

              <p className="pt-4 text-center text-slate-500 text-sm border-t border-slate-100">
                Already registered?{' '}
                <Link to='/login' className="text-primaryColor font-bold hover:underline">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup