import Doctor from "../models/DoctorSchema.js"; // Import the Doctor model
import Booking from "../models/BookingSchema.js"; // Import the Doctor model

export const updateDoctor = async (req, res) => {
  // Rename the function to updateDoctor
  const id = req.params.id;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      // Use the Doctor model
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedDoctor, // Use updatedDoctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update!",
      data: error,
    });
  }
};

export const deleteDoctor = async (req, res) => {
  // Rename the function to deleteDoctor
  const id = req.params.id;

  try {
    await Doctor.findByIdAndDelete(id); // Use the Doctor model

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete!",
      data: error,
    });
  }
};

export const getSingleDoctor = async (req, res) => {
  // Rename the function to getSingleDoctor
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password"); // Use the Doctor model

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "No Doctor Found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor Found",
      data: doctor, // Use doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctor!",
      data: error,
    });
  }
};

export const getAllDoctor = async (req, res) => {
  console.log("getAllDoctor")
  try {
    const { query } = req.query;
    let doctors;

    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password").sort({ averageRating: -1 }); // Sort by averageRating descending
    } else {
      doctors = await Doctor.find({ isApproved: "approved" }).select(
        "-password"
      ).sort({ averageRating: -1 }); // Sort by averageRating descending
    }

    res.status(200).json({
      success: true,
      message: "Doctors Found",
      data: doctors, // Use doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctors!",
      data: error.message,
    });
  }
};

export const unapprovedDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isApproved: "pending" }).select(
      "-password"
    );
    if (doctors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Unapproved Doctor Found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Unapproved Doctors Found",
      data: doctors, // Use doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve unapproved doctors!",
      data: error.message,
    });
  }
};

export const approveDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      id,
      { isApproved: "approved" },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Doctor Approved",
      data: doctor, // Use doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to approve doctor!",
      data: error.message,
    });
  }
};

export const rejectDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      id,
      { isApproved: "rejected" },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Doctor Rejected",
      data: doctor, // Use doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to reject doctor!",
      data: error.message,
    });
  }
};

export const getDoctorProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const doctor = await Doctor.findById(userId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const { password, ...rest } = doctor._doc
    let appointments = await Booking.find({ doctor: userId }).sort({ createdAt: -1 }); // Sort appointments by createdAt field in descending order
    res.status(200).json({
      success: true,
      message: "Doctor Found",
      data: { ...rest, appointments },
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctor!",
      data: error.message,
    });
  }
}


export const searchDoctor = async (req, res) => {
  const { query } = req.query;
  try {
    const doctors = await Doctor.find({
      isApproved: "approved",
      $or: [
        { name: { $regex: query, $options: "i" } },
        { specialization: { $regex: query, $options: "i" } },
      ],
    }).select("-password");

    res.status(200).json({
      success: true,
      message: "Doctors Found",
      data: doctors, // Use doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve doctors!",
      data: error.message,
    });
  }
}