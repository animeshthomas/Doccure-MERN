import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from '../Services/emailService.js';
import { succesRegistration } from '../emailContents/mailContents.js';
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );
};


// register controller
export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  try {
    let user = null

    // check the user role
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    // check if user exist
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }
    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User successfully created, Check your Email!" });
    // Construct email options
    const options = {
      to: email,
      subject: `Confirm Your Email, Team Doccure`,
      html: succesRegistration(name, email, `${process.env.CLIENT_SITE_URL}/confirm_email/${user._id}`) 
    };

    // Send the email
    await sendEmail(options);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "You Got Error, Try Again" ,error});
  }
};

export const login = async (req, res) => {

  const { 
      email
  } = req.body

  try {
      
      let user = null
      const patient = await User.findOne({email})
      const doctor = await Doctor.findOne({email})

      if (patient) {
          if (patient.role === 'patient') {
              user = patient
          } else if (patient.role === 'admin') {
              user = admin
          }
      }
      if (doctor) {
          user = doctor
      }

      // check if user exist or not
      if (!user) {
          return res.status(404).json({ message: 'User Not Found' })
      }

      // compare password
      const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

      if (!isPasswordMatch) {
          return res.status(400).json({ status: false, message: 'Invalid Credentials' });
      }

      if(!user.emailVerified) {
        return res.status(400).json({ status: false, message: 'Please Verify Your Email' });
      }

      // get token
      const token = generateToken(user);
      const { password, role, appointments, ...rest } = user._doc;
      const userId = rest._id.toString(); // Convert ObjectId to string
      console.log("User ID:", userId); // Debug statement
      const isPremiumUser = rest.isPremiumUser;
      res
          .status(200)
          .json({ status: true, message: 'Successfully Login', token, data: { ...rest }, role, userId,isPremiumUser });

  } catch (error) {
      console.error("Error:", error); // Debug statement
      res.status(500).json({ status: false, message: 'Failed To Login' });
  }
}



export const confirmEmail = async (req, res) => {
  const { verificationToken } = req.params;
  try {
    const user = await User.findById(verificationToken);
    const doctor = await Doctor.findById(verificationToken);
    if (!user && !doctor) {
      return res.status(400).json({ message: "No User Found" });
    }
    if(user){
      user.emailVerified = true;
      await user.save();
    }
    if(doctor){
      doctor.emailVerified = true;
      await doctor.save();
    }
    res.status(200).json({ message: "Email Verified Successfully" });
  }
  catch (error) {
    res.status(500).json({ message: "Failed to verify email" });
  }
}