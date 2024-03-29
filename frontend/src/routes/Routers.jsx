// all pages
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import Services from '../pages/Services'
import Signup from '../pages/Signup'
import Doctors from '../pages/Doctors/Doctors'
import DoctorsDetails from '../pages/Doctors/DoctorsDetails'
import MyAccount from '../Dashboard/user-account/MyAccount'
import Dashboard from '../Dashboard/doctor-account/Dashboard'

import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import CheckoutSuccess from '../pages/Doctors/CheckoutSuccess'
import ForgotPassword from '../pages/forgotPassword'
import ResetPassword from '../pages/ResetPassword'
import AdminProfile from '../Dashboard/admin-account/AdminProfile'
import ProvidePrescription from '../Dashboard/doctor-account/ProvidePrescription'
import ConfirmEmail from '../pages/ConfirmEmail'


const Routers = () => {
  return <Routes>
    <Route path="/" element={<Home/>}  />
    <Route path="/home" element={<Home/>} />
    <Route path="/doctors" element={<Doctors/>} />
    <Route path="/doctors/:id" element={<DoctorsDetails/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/confirm_email/:verificationToken" element={<ConfirmEmail/>} />
    <Route path="/register" element={<Signup/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="/services" element={<Services/>} />
    <Route path="/forgot-password" element={<ForgotPassword/>} />
    <Route path="/reset-password/:resetToken" element={<ResetPassword/>} />
    <Route path="/checkout-success" element={<CheckoutSuccess/>} />
    <Route path="/users/profile/me" element={ <ProtectedRoute allowedRoles={['patient']}>
                                                <MyAccount /> 
                                              </ProtectedRoute>
                                            } />
    <Route path="/doctors/profile/me" element={ <ProtectedRoute allowedRoles={['doctor']}>
                                                  <Dashboard />
                                                </ProtectedRoute>
                                              } />
    <Route path="/providePrescription/:userid" element={ <ProtectedRoute allowedRoles={['doctor']}>
                                                  <ProvidePrescription />
                                                </ProtectedRoute>
                                              } />
    <Route path="/admin/profile/me" element={ <ProtectedRoute allowedRoles={['admin']}>
                                                  <AdminProfile />
                                                </ProtectedRoute>
                                              } />
  </Routes>
}

export default Routers