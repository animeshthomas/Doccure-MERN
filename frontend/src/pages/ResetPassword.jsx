import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';
import { BiLockAlt, BiArrowBack, BiCheckCircle } from 'react-icons/bi';
import HashLoader from 'react-spinners/HashLoader.js';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!resetToken) {
      toast.error('Invalid or missing reset token');
    }
  }, [resetToken]);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async event => {
    event.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ resetToken, newPassword: formData.newPassword })
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setLoading(false);
      toast.success(result.message || 'Password reset successful!');
      navigate('/login');

    } catch (err) {
      toast.error(err.message || 'Failed to reset password');
      setLoading(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-blue-50/50 via-white to-white flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-[480px] mx-auto px-4">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-2xl animate-fadeIn">
          <div className="text-center mb-8">
            <span className="text-primaryColor font-semibold text-xs tracking-wider uppercase bg-primaryColor/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Security
            </span>
            <h2 className="text-[26px] sm:text-[28px] font-[800] text-headingColor tracking-tight">
              Create New Password
            </h2>
            <p className="text-slate-500 text-sm mt-1.5 leading-relaxed">
              Please enter and confirm your new secure password.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="form__label">New Password</label>
              <div className="relative flex items-center">
                <BiLockAlt className="absolute left-3.5 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Enter at least 6 characters"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="form__input pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label className="form__label">Confirm New Password</label>
              <div className="relative flex items-center">
                <BiLockAlt className="absolute left-3.5 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
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
              {loading ? <HashLoader size={20} color="#fff" /> : "Update Password"}
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

export default ResetPassword;
