import React, { useState, useEffect } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import convertTime from '../../utils/covertTime';
import { BASE_URL, token } from '../../config';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { BsCalendarCheck, BsClock, BsShieldCheck } from 'react-icons/bs';

const SidePanel = ({ doctorId, ticketPrice, timeSlots, isApproved }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableTimesForSelectedDate, setAvailableTimesForSelectedDate] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      const formattedSelectedDate = new Date(selectedDate).toLocaleDateString('en-US', {
        weekday: 'long'
      }).toLowerCase();

      const selectedDayTimeSlots = timeSlots?.filter(slot => slot.day.toLowerCase() === formattedSelectedDate) || [];
      setAvailableTimesForSelectedDate(selectedDayTimeSlots);
      setSelectedTime('');
    }
  }, [selectedDate, timeSlots]);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return `${year}-${month}-${day}`;
  };

  const verifyDoctorHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/doctors/approve/${doctorId}`, {
        method: 'put',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      window.location.reload();
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const bookingHandler = async () => {
    try {
      if (!selectedDate || !selectedTime) {
        throw new Error('Please select both appointment date and time');
      }

      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          appointmentDate: selectedDate,
          appointmentTime: selectedTime
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      if (data.session?.url) {
        window.location.href = data.session.url;
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const userId = localStorage.getItem('userId');

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl sticky top-24">
      {/* Price Header */}
      <div className="flex items-center justify-between pb-5 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Consultation Fee</span>
          <p className="text-2xl font-[800] text-headingColor tracking-tight mt-0.5">
            ₹{ticketPrice} <span className="text-xs font-medium text-slate-500">/ session</span>
          </p>
        </div>
        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-100">
          <BsShieldCheck className="w-3.5 h-3.5" /> Verified
        </span>
      </div>

      {/* Available Slots Overview */}
      <div className="mt-6">
        <h4 className="text-sm font-bold text-headingColor flex items-center gap-1.5 mb-3">
          <BsClock className="w-4 h-4 text-primaryColor" /> Available Schedule
        </h4>

        {timeSlots && timeSlots.length > 0 ? (
          <ul className="space-y-2 max-h-36 overflow-y-auto pr-1">
            {timeSlots.map((item, index) => (
              <li className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-slate-50 text-slate-700 font-medium" key={index}>
                <span className="capitalize font-semibold text-headingColor">{item.day}</span>
                <span className="text-slate-500">{convertTime(item.startingTime)} - {convertTime(item.endingTime)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-slate-400 italic">No scheduled time slots specified.</p>
        )}
      </div>

      {/* Date Picker */}
      <div className="mt-6">
        <label htmlFor="appointmentDate" className="form__label text-xs">
          Select Appointment Date
        </label>
        <input
          type="date"
          id="appointmentDate"
          className="form__input text-sm py-2.5"
          value={selectedDate}
          min={getCurrentDate()}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Time Slot Selector */}
      {selectedDate && (
        <div className="mt-4 animate-slideDown">
          <label htmlFor="appointmentTime" className="form__label text-xs">
            Select Appointment Slot
          </label>
          {availableTimesForSelectedDate.length > 0 ? (
            <select
              id="appointmentTime"
              className="form__input text-sm py-2.5 font-medium"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Choose a slot</option>
              {availableTimesForSelectedDate.map((timeSlot, index) => (
                <option key={index} value={timeSlot.startingTime}>
                  {convertTime(timeSlot.startingTime)} - {convertTime(timeSlot.endingTime)}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-xs text-amber-600 bg-amber-50 p-2.5 rounded-xl border border-amber-100">
              No consultation slots available on this day. Please pick another date.
            </p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        {!userId || userId === "null" ? (
          <Link to="/login" className="block">
            <button className="btn w-full py-3 text-sm rounded-xl">
              Sign In to Book Appointment
            </button>
          </Link>
        ) : isApproved === "approved" ? (
          <button 
            onClick={bookingHandler} 
            disabled={isLoading || !selectedDate || !selectedTime}
            className="btn w-full py-3 text-sm rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <HashLoader color="#ffffff" loading={isLoading} size={20} />
            ) : (
              <span className="inline-flex items-center gap-2">
                <BsCalendarCheck className="w-4 h-4" /> Book Appointment
              </span>
            )}
          </button>
        ) : isApproved === "pending" ? (
          <button 
            onClick={verifyDoctorHandler} 
            disabled={isLoading}
            className="btn w-full py-3 text-sm rounded-xl bg-amber-500 hover:bg-amber-600"
          >
            {isLoading ? (
              <HashLoader color="#ffffff" loading={isLoading} size={20} />
            ) : (
              'Verify & Approve Doctor'
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default SidePanel;
