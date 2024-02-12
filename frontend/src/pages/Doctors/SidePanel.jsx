import React from 'react';
import convertTime from '../../utils/covertTime';
import { BASE_URL,token } from '../../config';
import { toast } from 'react-toastify';

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
    const bookingHandler = async () => {
        try {
            const response = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`            
            , {
                method: 'post', 
                headers: {
                    Authorization: `Bearer ${token}`
                }
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
            // console.error(error.message);
        }
    }
    
    
  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} Rupees
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>

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

      <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">Book Appointment</button>
    </div>
  );
};

export default SidePanel;
