import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import Booking from '../models/BookingSchema.js';

export const getInsights = async (req, res) => {
    try {
        // Get total counts
        const totalUsers = await User.countDocuments();
        const totalDoctors = await Doctor.countDocuments();
        const totalBookings = await Booking.countDocuments();
        // Get doctor names and number of bookings they have


        const currentDate = new Date();
        const last3MonthsDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1); // Date of the first day of 3 months ago
        const last3MonthsBookings = await Booking.aggregate([
            {
                $match: {
                    createdAt: { $gte: last3MonthsDate } // Filter bookings created in the last 3 months
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by month
                    noofbookings: { $sum: 1 }
                }
            }
        ]);
        const formattedBookings = last3MonthsBookings.map(item => {
            const [year, month] = item._id.split('-');
            const monthName = new Date(year, parseInt(month) - 1, 1).toLocaleString('en-US', { month: 'long' });
            const formattedMonth = `${monthName} ${year}`;
            return {
                _id: item._id,
                monthname: formattedMonth,
                noofbookings: item.noofbookings
            };
        });

        const doctorBookings = await Booking.aggregate([
            {
                $group: {
                    _id: "$doctor",
                    bookingsCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "doctors", // This should be the name of your doctors collection
                    localField: "_id",
                    foreignField: "_id",
                    as: "doctor"
                }
            },
            {
                $unwind: "$doctor"
            },
            {
                $project: {
                    _id: 0,
                    doctorName: "$doctor.name",
                    specialization: "$doctor.specialization",
                    bookingsCount: 1
                }
            }
        ]);
        const userBookings = await Booking.aggregate([
            {
                $group: {
                    _id: "$user",
                    bookingsCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "users", // This should be the name of your doctors collection
                    localField: "_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $project: {
                    _id: 0,
                    userName: "$user.name",
                    bookingsCount: 1
                }
            }
        ]);
        const specializationBookings = await Booking.aggregate([
            {
                $lookup: {
                    from: "doctors",
                    localField: "doctor",
                    foreignField: "_id",
                    as: "doctor"
                }
            },
            {
                $unwind: "$doctor"
            },
            {
                $group: {
                    _id: "$doctor.specialization",
                    bookingsCount: { $sum: 1 }
                }
            }
        ]);
        const top3Doctors = await Promise.all(doctorBookings.map(async (doctor) => {
            const fullDoctorDetails = await Doctor.findById(doctor._id);
            return { ...doctor, details: fullDoctorDetails };
        }));

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalDoctors,
                totalBookings,
                doctorBookings,
                top3Doctors,
                userBookings,
                last3MonthsBookings: formattedBookings,
                specializationBookings
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get insights!",
            error: error.message
        });
    }
};
