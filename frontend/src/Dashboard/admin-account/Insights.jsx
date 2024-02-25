import React, { useState, useEffect } from 'react';
import useGetProfile from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import DoctorCard from '../../components/Doctors/DoctorCard';

// Register the necessary components for both Pie and Bar charts
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Insights = () => {
    const { data, loading, error } = useGetProfile(BASE_URL + '/insights/');
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        if (data && data.mostBookedDoctors) {
            setDoctors(data.mostBookedDoctors.map(item => item.doctor));
        }
    }, [data]);

    // Function to generate chart data for the Pie chart (Patients to Doctors Ratio)
    const generatePatientDoctorRatioChartData = () => {
        return {
            labels: ['Total Patients', 'Total Doctors'],
            datasets: [
                {
                    label: '# of Counts',
                    data: [data?.totalUsers || 0, data?.totalDoctors || 0],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
    };

    // Function to generate chart data for the Bar chart (Doctor Bookings)
    const generateDoctorBookingsChartData = () => {
        const labels = data?.doctorBookings?.map(booking => booking.doctorName) || [];
        const bookingCounts = data?.doctorBookings?.map(booking => booking.bookingsCount) || [];

        return {
            labels,
            datasets: [
                {
                    label: 'Booking Counts',
                    data: bookingCounts,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    borderColor: 'rgba(53, 162, 235, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    const chartOptions = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    if (loading) return <Loading />;
    if (error) return <Error errMessage={error.message} />;
    if (!data) return <div>No data available</div>;

    return (
        <div>
            <div className="flex justify-center items-center" style={{ padding: '20px' }}>
                <div className="chart-container" style={{ height: "400px", width: "400px" }}>
                    <h3 className="text-lg font-semibold text-headingColor mb-5">Patients to Doctors Ratio</h3>
                    <Pie data={generatePatientDoctorRatioChartData()} options={chartOptions} />
                </div>

                {/* Gap Element */}
                <div style={{ width: '50px' }}></div> {/* Adjust the width as needed for the gap */}

                <div className="chart-container" style={{ height: "400px", width: "400px" }}>
                    <h3 className="text-lg font-semibold text-headingColor mb-5">Doctor Bookings</h3>
                    <Bar data={generateDoctorBookingsChartData()} options={chartOptions} />
                </div>
            </div>

            {/* <div>
                {!loading && doctors.length > 0 && (
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                        {doctors.map(doctor => (
                            <DoctorCard doctor={doctor} key={doctor._id} />
                        ))}
                    </div>
                )}
                {!loading && doctors.length === 0 && <h2 className='mt-5 text-center text-primaryColor text-[20px] leading-7 font-semibold align:center'>No New Doctor Registrations To Verify</h2>}
            </div> */}
        </div>
    );
};

export default Insights;
