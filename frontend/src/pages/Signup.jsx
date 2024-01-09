import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import signupImg from '../assets/images/signup.gif';
import avatar from '../assets/images/doctor-img01.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    role: 'patient',
    photo: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };

  return (
    <section className='px-5 xl:px-0'>
      <div className="max-w-[1170px] mx-auto">
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className='rounded-l-lg'>
              <img src={signupImg} alt="" className='w-full rounded-l-lg' />
            </figure>
          </div>
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>Create an <span className='text-primaryColor'>Account</span></h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <input
                  type='text'
                  placeholder='Enter Your Name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type='email'
                  placeholder='Enter Your Email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type='password'
                  placeholder='Enter Your Password'
                  name='password'
                  value={formData.password}
                  onChange={handleInputChange}
                  className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                  required
                />
              </div>
              <div className="mb-5 flex items-center justify-between">
                <label htmlFor="role" className='text-headingColor font-bold text-[16px] leading-7'>
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'
                  >
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                  </select>
                </label>
                <label htmlFor="gender" className='text-headingColor font-bold text-[16px] leading-7'>
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>
              <div className="mb-5 flex items-center gap-3">
                <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                  <img src={avatar} alt="" className='w-full rounded-full' />
                </figure>
                <div className="mb-5">
                  <div className="flex items-center">
                    <label htmlFor="avatar" className="flex items-center justify-center w-32 h-32 bg-gray-200 border border-dashed border-gray-400 rounded-md cursor-pointer hover:bg-gray-300">
                      <span className="text-gray-600">Choose File</span>
                      <input type="file" name="photo" id="avatar" className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white py-3 rounded-md transition duration-300 hover:bg-opacity-90 focus:outline-none focus:bg-opacity-90"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p className='mt-4 text-sm text-textColor flex items-center'>
              Already have an account?{' '}
              <Link to='/login' className='text-primaryColor hover:underline ml-1'>
                Log In here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
