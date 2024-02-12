import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(BASE_URL + '/users/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            setMessage(data.message);
            toast.success('Reset password link sent to your email');
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to send reset password email');
            toast.error('Failed to send reset password email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="px-5 lg:px-0">
            <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
                <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 text-center">
                    Forgot Your Password?
                </h3>

                <form className="py-4 md:py-0" onSubmit={submitHandler}>
                    <div className="mb-5">
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={handleInputChange}
                            className="w-full py-3 border-b border-solid border-[#0066ff61] 
              focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
              text-headingColor placeholder:text-textColor cursor-pointer"
                            required
                        />
                    </div>

                    <div className="mt-7">
                        <button type="submit" className="w-full bg-primaryColor text-white text-[18px] 
            leading-[30px] rounded-lg px-4 py-3">
                            {loading ? 'Sending Email...' : 'Send Reset Link'}
                        </button>
                    </div>

                    <p className="mt-5 text-textColor text-center">
                        Remember your password?
                        <Link to='/login' className="text-primaryColor font-medium ml-1">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default ForgotPassword;
