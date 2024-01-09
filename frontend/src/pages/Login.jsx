import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your login logic here
    console.log('Form Data:', formData);
  };

  return (
    <section className='px-5 lg:px-0'>
      <div className='w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 bg-white'>
        <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-6'>
          Hello! <span className='text-primaryColor'>Welcome</span> Back 🎉
        </h3>
        <form onSubmit={handleSubmit} className='py-4 md:py-0'>
          <div className='mb-5'>
            <input
              type='email'
              placeholder='Enter Your Email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
            />
          </div>
          <div className='mb-5'>
            <input
              type='password'
              placeholder='Enter Your Password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[22px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-primaryColor text-white py-3 rounded-md transition duration-300 hover:bg-opacity-90 focus:outline-none focus:bg-opacity-90'
          >
            Log In
          </button>
        </form>


        <p className='mt-4 text-sm text-textColor text-center items-center'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-primaryColor hover:underline'>
            Register here
          </Link>
        </p>

      </div>
    </section>
  );
};

export default Login;
