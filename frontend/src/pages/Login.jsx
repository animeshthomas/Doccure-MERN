import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../config'
import { toast } from 'react-toastify'
import { authContext } from '../context/AuthContext.jsx'
import HashLoader from 'react-spinners/HashLoader.js'
import { BiEnvelope, BiLockAlt } from 'react-icons/bi'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { dispatch } = useContext(authContext)

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = async event => {
    event.preventDefault();
    setLoading(true);

    // Check if email is admin and password is 1234
    if (formData.email === 'admin@gmail.com' && formData.password === '1234') {
      navigate('/home');
      setLoading(false);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: 'Admin Medicare',
          token: 'admToken',
          role: 'admin',
          userid: '0'
        }
      });
      toast.success('Welcome Medicare Admin!');
      return;
    } else {
      try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message);
        }

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            userId: result.userId,
            isPremiumUser: result.isPremiumUser,
            user: result.data,
            token: result.token,
            role: result.role,
          }
        });

        setLoading(false);
        toast.success("Welcome " + result.data.name + "!");
        navigate('/home');
        window.location.reload();

      } catch (err) {
        toast.error(err.message);
        setLoading(false);
      }
    }
  }

  return (
    <section className="py-14 lg:py-20 bg-gradient-to-b from-blue-50/50 via-white to-white flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-[500px] mx-auto px-4">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-2xl animate-fadeIn">
          <div className="text-center mb-8">
            <span className="text-primaryColor font-semibold text-xs tracking-wider uppercase bg-primaryColor/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Secure Access
            </span>
            <h2 className="text-[26px] sm:text-[30px] font-[800] text-headingColor tracking-tight">
              Welcome Back
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Sign in to manage your clinical consultations & records.
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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form__input pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="form__label mb-0">Password</label>
                <Link to='/forgot-password' className="text-xs text-primaryColor font-semibold hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative flex items-center">
                <BiLockAlt className="absolute left-3.5 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form__input pl-11"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full py-3.5 mt-4 text-[16px]"
            >
              {loading ? <HashLoader size={22} color="#fff" /> : "Sign In to Account"}
            </button>

            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">
                Don&apos;t have an account?{' '}
                <Link to='/register' className="text-primaryColor font-bold hover:underline">
                  Create an Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login