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
    const [insight, setInsight] = useState('patientDoctorRatio');
    const [doctors, setDoctors] = useState(data?.top3Doctors || []);

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

    // Function to generate chart data for the Bar chart (Specialization Bookings)
    const generateSpecializationBookingsChartData = () => {
        const labels = data?.specializationBookings?.map(booking => booking._id) || [];
        const bookingCounts = data?.specializationBookings?.map(booking => booking.bookingsCount) || [];

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

    // Function to generate chart data for the Bar chart (User Bookings)
    const generateUserBookingsChartData = () => {
        const labels = data?.userBookings?.map(booking => booking.userName) || [];
        const bookingCounts = data?.userBookings?.map(booking => booking.bookingsCount) || [];

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

    // Function to generate chart data for the Bar chart (Month-wise Bookings)
    const generateMonthsBookingsChartData = () => {
        const labels = data?.last3MonthsBookings?.map(booking => booking.monthname) || [];
        const bookingCounts = data?.last3MonthsBookings?.map(booking => booking.noofbookings) || [];

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

    const handleInsightChange = (newInsight) => {
        setInsight(newInsight);
    };

    if (loading) return <Loading />;
    if (error) return <Error errMessage={error.message} />;
    if (!data) return <div>No data available</div>;

    return (
        <div>
            <div className="flex justify-center items-center" style={{ padding: '20px' }}>
                <div>
                    <div className="mb-4">
                        <button
                            onClick={() => handleInsightChange('patientDoctorRatio')}
                            className={`bg-${insight === 'patientDoctorRatio' ? 'primaryColor' : 'white'} text-${insight === 'patientDoctorRatio' ? 'white' : 'black'} font-normal p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-${insight === 'patientDoctorRatio' ? 'primaryColor' : 'primaryColor'}`}
                            style={{ width: "200px" }}>
                            Patient to Doctor Ratio
                        </button>
                    </div>
                    <div className="mb-4">
                        <button
                            onClick={() => handleInsightChange('doctorBookings')}
                            className={`bg-${insight === 'doctorBookings' ? 'primaryColor' : 'white'} text-${insight === 'doctorBookings' ? 'white' : 'black'} font-normal p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-${insight === 'doctorBookings' ? 'primaryColor' : 'primaryColor'}`}
                            style={{ width: "200px" }}>
                            Doctor Bookings
                        </button>
                    </div>
                    
                    <div className="mb-4">
                        <button
                            onClick={() => handleInsightChange('userBookings')}
                            className={`bg-${insight === 'userBookings' ? 'primaryColor' : 'white'} text-${insight === 'userBookings' ? 'white' : 'black'} font-normal p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-${insight === 'userBookings' ? 'primaryColor' : 'primaryColor'}`}
                            style={{ width: "200px" }}>
                            User Bookings
                        </button>
                    </div>
                    <div className="mb-4">
                        <button
                            onClick={() => handleInsightChange('monthsBookings')}
                            className={`bg-${insight === 'monthsBookings' ? 'primaryColor' : 'white'} text-${insight === 'monthsBookings' ? 'white' : 'black'} font-normal p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-${insight === 'monthsBookings' ? 'primaryColor' : 'primaryColor'} mb-5`}
                            style={{ width: "200px" }}>
                            Month-wise Bookings
                        </button>
                    </div>
                    <div className="mb-4">
                        <button
                            onClick={() => handleInsightChange('specializationBookings')}
                            className={`bg-${insight === 'specializationBookings' ? 'primaryColor' : 'white'} text-${insight === 'specializationBookings' ? 'white' : 'black'} font-normal p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-${insight === 'specializationBookings' ? 'primaryColor' : 'primaryColor'}`}
                            style={{ width: "200px" }}>
                            Specialization Bookings
                        </button>
                    </div>
                </div>



                <div className="chart-container" style={{ height: "400px", width: "400px" }}>
                    {insight === 'patientDoctorRatio' && (
                        <Pie data={generatePatientDoctorRatioChartData()} options={chartOptions} />
                    )}
                    {insight === 'doctorBookings' && (
                        <Bar data={generateDoctorBookingsChartData()} options={chartOptions} />
                    )}
                    {insight === 'specializationBookings' && (
                        <Bar data={generateSpecializationBookingsChartData()} options={chartOptions} />
                    )}
                    {insight === 'userBookings' && (
                        <Bar data={generateUserBookingsChartData()} options={chartOptions} />
                    )}
                    {insight === 'monthsBookings' && (
                        <Bar data={generateMonthsBookingsChartData()} options={chartOptions} />
                    )}
                </div>
            </div>
            <div>
                {!loading && doctors.length > 0 && (
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                        {doctors.map(doctor => (
                            <DoctorCard doctor={doctor} key={doctor._id} />
                        ))}
                    </div>
                )}
                {!loading && doctors.length === 0 && <h2 className='mt-5 text-center text-primaryColor text-[20px] leading-7 font-semibold align:center'></h2>}
            </div>
        </div>
    );
};

export default Insights;
