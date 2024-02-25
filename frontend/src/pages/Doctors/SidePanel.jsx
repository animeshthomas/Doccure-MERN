import React, { useState, useEffect } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import convertTime from '../../utils/covertTime'; // corrected typo in the import
import { BASE_URL, token } from '../../config';
import { toast } from 'react-toastify';

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

      const selectedDayTimeSlots = timeSlots.filter(slot => slot.day.toLowerCase() === formattedSelectedDate);
      setAvailableTimesForSelectedDate(selectedDayTimeSlots);
      setSelectedTime('');
    }
  }, [selectedDate, timeSlots]);
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Add leading zeros to single-digit months and days
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
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
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} Rupees
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">Available Time Slots:</p>

        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li className="flex items-center justify-between mb-2" key={index}>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <label htmlFor="appointmentDate" className="block text-lg font-semibold text-gray-700">
          Appointment Date:
        </label>
        <input
          type="date"
          id="appointmentDate"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
          value={selectedDate}
          min={getCurrentDate()}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

      </div>

      {availableTimesForSelectedDate.length > 0 && (
        <div className="mt-4">
          <label htmlFor="appointmentTime" className="block text-lg font-semibold text-gray-700">
            Appointment Time:
          </label>
          <select
            id="appointmentTime"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">Select a time</option>
            {availableTimesForSelectedDate.map((timeSlot, index) => (
              <option key={index} value={timeSlot.startingTime}>
                {convertTime(timeSlot.startingTime)} - {convertTime(timeSlot.endingTime)}
              </option>
            ))}
          </select>
        </div>
      )}
      
      {isApproved === "approved" ? (
        <button onClick={bookingHandler} className="btn px-2 w-full rounded-md mt-4">
          {isLoading ? (
            <HashLoader color="#ffffff" loading={isLoading} size={20} />
          ) : (
            'Book Appointment'
          )}
        </button>
      ) : isApproved === "pending" ? (
        <button onClick={verifyDoctorHandler} 
        className="btn px-2 w-full rounded-md mt-4">
          {isLoading ? (
            <HashLoader color="#ffffff" loading={isLoading} size={20} />
          ) : (
          'Verify Doctor'
          )}</button>
      ) : null}
    </div>
  );
};

export default SidePanel;
