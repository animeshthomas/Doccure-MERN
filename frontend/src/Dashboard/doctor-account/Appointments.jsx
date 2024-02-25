import React from 'react';
import { formateDate } from '../../utils/formateDate';
import convertTime from '../../utils/covertTime';
import { Link } from 'react-router-dom';

const Appointments = ({ appointments }) => {
  const currentDate = new Date();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gender
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Booked On
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

            </th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map(item => {
            const appointmentDate = new Date(item.appointmentDate);
            const appointmentDateTime = appointmentDate.setHours(
              item.appointmentTime.split(':')[0],
              item.appointmentTime.split(':')[1]
            );

            // Check if appointment date has passed
            const isAppointmentPassed = appointmentDateTime < currentDate;

            return (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.user.gender}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.isPaid ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Paid
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Unpaid
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.ticketPrice}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formateDate(item.createdAt)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formateDate(item.appointmentDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{convertTime(item.appointmentTime)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {isAppointmentPassed && (
                    <Link
                      to={`/providePrescription/${item.user._id}`}
                      className="bg-primaryColor text-white p-2 rounded-md inline-block"
                    >
                      Provide Prescription
                    </Link>
                  )}
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
