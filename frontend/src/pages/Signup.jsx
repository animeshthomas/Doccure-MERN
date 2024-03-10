import { Link, useNavigate } from 'react-router-dom'

import signupImg from "../assets/images/signup.gif"

import { useState } from 'react'
import uploadImageToCloudinary from '../utils/uploadCloudinary'
import { BASE_URL } from "../config.js"
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader.js'


const Signup = () => {

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewURL, setPreviewURL] = useState("")
  const [loading, setLoading] = useState(false)
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: 'patient'
  })

  const validatePassword = (password) => {
    setPasswordError('');
    if (!/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/.test(password)) {
      setPasswordError('Password must be at least 8 characters long and include at least one letter and one number.');
    }
  };
  const validateName = (name) => {
    if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name)) {
      setNameError('Please enter a valid name.');
    } else {
      setNameError('');
    }
  };
  const validateEmail = (email) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };
  const navigate = useNavigate()

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (e.target.name === 'password') {
      validatePassword(e.target.value);
    }
    if (e.target.name === 'name') {
      validateName(e.target.value);
    }
    if (e.target.name === 'email') {
      validateEmail(e.target.value);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0]

    const data = await uploadImageToCloudinary(file)

    setPreviewURL(data.url)
    setSelectedFile(data.url)
    setFormData({ ...formData, photo: data.url })

    // Later we will use cloudinary to upload images
  }

  const submitHandler = async event => {
    event.preventDefault()
    setLoading(true)
    if (passwordError || emailError || nameError) {
      setLoading(false);
      toast.error('Please correct the errors before submitting.');
      return;
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
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ==============   img box     ==============*/}
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="" className="w-full rounded-l-lg" />
            </figure>
          </div>

          {/* ==============   sign up form     ==============*/}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 text-center">
              Create an <span className="text-primaryColor">account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="name"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] 
                  focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                  text-headingColor placeholder:text-textColor cursor-pointer"
                  required
                />
                {nameError && (
                  <div className="flex items-center mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-500 text-[14px] font-medium">{nameError}</p>
                  </div>
                )}
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] 
                  focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                  text-headingColor placeholder:text-textColor cursor-pointer"
                  required
                />
                {emailError && (
                  <div className="flex items-center mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-500 text-[14px] font-medium">{emailError}</p>
                  </div>
                )}
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] 
                  focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
                  text-headingColor placeholder:text-textColor cursor-pointer"
                  required
                />
                {passwordError && (
                  <div className="flex items-center mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-500 text-[14px] font-medium">{passwordError}</p>
                  </div>
                )}
              </div>

              <div className="mb-5 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                    required
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>

                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              <div className="mb-5 flex items-center gap-3">
                {selectedFile && <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor 
                  flex items-center justify-center">
                  <img
                    src={previewURL}
                    alt=""
                    className="w-full rounded-full"
                  />
                </figure>}

                <div className="relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg,.png"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />

                  <label htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] 
                  text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg
                  truncate cursor-pointer">
                    Upload Photo
                  </label>
                </div>
              </div>

              <div className="mt-7">
                <button
                  disabled={loading && true}
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  {loading ? (
                    <HashLoader size={35} color="#ffffff" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                Already have an account?
                <Link to='/Login' className="text-primaryColor font-medium ml-1">
                  Login
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