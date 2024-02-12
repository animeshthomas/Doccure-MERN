import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import crypto from "crypto";
import { sendEmail } from "../Services/emailService.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update!",
      data: updateUser,
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete!",
      data: updateUser,
    });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password"); // Query the user by ID

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No User Found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User Found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user!",
      data: error,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      message: "Users Found",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users!",
      data: error.message, // Corrected error handling
    });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }
    const { password, ...rest } = user._doc
    res.status(200).json({
      success: true,
      message: "Profile info is getting!",
      data: rest
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get profile info!",
      data: err
    })
  }

}

export const getMyAppointments = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId })
    const doctorIds = bookings.map(el => el.doctor.id)
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select('-password');
    res.status(200).json({
      success: true,
      message: "Appointments are getting!",
      data: doctors
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to get appointments!",
      data: err.message
    })

  }
}


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email.",
      });
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    const resetURL = `${process.env.CLIENT_SITE_URL}/reset-password/${resetToken}`;
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Instructions',
      html: `To reset your password, please click on the following link: ${resetURL}`
    });
    res.status(200).json({
      success: true,
      message: "Password reset instructions sent to your email.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to process the request.",
      data: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    // Find user by reset token and check expiration
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Password reset token is invalid or has expired.",
      });
    }

    // Update user's password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to reset password.",
      data: error.message,
    });
  }
};
