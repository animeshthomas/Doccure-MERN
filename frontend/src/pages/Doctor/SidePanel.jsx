import React from 'react';

const SidePanel = () => {
    return (
        <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
            <div className="flex items-center justify-between">
                <p className='text_para  mt-0 font-semibold'>Ticket Price</p>
                <p className='text_para  mt-0 font-semibold'>$ 250</p>
            </div>
            <div className="mt-[30px]">
                <p className='text_para mt-0 font-semibold text-headingColor'>
                    Available Time Slots:
                </p>
                <ul className='mt-3'>
                    <li className='flex items-center justify-between mb-2'>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>Sunday</p>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>10:00 AM - 12:00 PM</p>
                    </li>
                    <li className='flex items-center justify-between mb-2'>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>Monday</p>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>1:00 PM - 3:00 PM</p>
                    </li>
                    <li className='flex items-center justify-between mb-2'>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>Tuesday</p>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>4:00 PM - 6:00 PM</p>
                    </li>
                    <li className='flex items-center justify-between mb-2'>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>Wednesday</p>
                        <p className='text-[15px] leading-6 text-textColor font-semibold'>6:00 PM - 8:00 PM</p>
                    </li>
                    {/* ... Add timings for other days */}
                </ul>
            </div>
            
            {/* Book Appointment Button */}
            <button className="btn px-2 w-full rounded-md">
                Book Appointment
            </button>
        </div>
    );
};

export default SidePanel;
