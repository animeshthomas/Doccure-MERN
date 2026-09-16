import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';
import { BiEnvelope, BiArrowBack } from 'react-icons/bi';
import HashLoader from 'react-spinners/HashLoader.js';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

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
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }
      toast.success('Password reset link sent to your email!');
    } catch (error) {
      toast.error(error.message || 'Failed to send reset password email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-blue-50/50 via-white to-white flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-[480px] mx-auto px-4">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-2xl animate-fadeIn">
          <div className="text-center mb-8">
            <span className="text-primaryColor font-semibold text-xs tracking-wider uppercase bg-primaryColor/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Account Recovery
            </span>
            <h2 className="text-[26px] sm:text-[28px] font-[800] text-headingColor tracking-tight">
              Reset Your Password
            </h2>
            <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
              Enter your registered email address and we'll send you instructions to reset your password.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="form__label">Email Address</label>
              <div className="relative flex items-center">
                <BiEnvelope className="absolute left-3.5 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={handleInputChange}
                  className="form__input pl-11"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full py-3.5 mt-2 text-[15px]"
            >
              {loading ? <HashLoader size={20} color="#fff" /> : "Send Password Reset Link"}
            </button>

            <div className="pt-4 border-t border-slate-100 text-center">
              <Link to='/login' className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-primaryColor font-semibold transition-colors">
                <BiArrowBack className="w-4 h-4" />
                <span>Return to Login</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
