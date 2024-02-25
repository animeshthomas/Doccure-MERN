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
                    bookingsCount: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalDoctors,
                totalBookings,
                doctorBookings
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
