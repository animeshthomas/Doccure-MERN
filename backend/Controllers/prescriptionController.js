import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Prescription from "../models/prescriptionSchema.js"; 
import { prescriptionEmail } from '../emailContents/mailContents.js';
import { sendEmail } from "../Services/emailService.js";

export const providePrescription = async (req, res) => {
    try {
        const { doctor, patient, prescriptions } = req.body;
        
        if (!doctor || !patient || !prescriptions || !Array.isArray(prescriptions) || prescriptions.length === 0) {
            return res.status(400).json({ error: "DoctorId, userId, and prescriptions are required as a non-empty array" });
        }

        const doctoR = await Doctor.findById(doctor);
        const user = await User.findById(patient);
        
        if (!doctor || !user) {
            return res.status(404).json({ error: "Doctor or user not found" });
        }

        const newPrescription = new Prescription({
            doctor: doctoR._id,
            patient: user._id,
            prescriptions: prescriptions
        });

        await newPrescription.save();
        await sendEmail({
            to: user.email,
            subject: `New Prescription From ${doctoR.name}`,
            html: prescriptionEmail(doctoR.name,user.name, prescriptions)
        })

        res.status(200).json({ message: "Prescription sent successfully" });
    } catch (error) {
        console.error("Error sending prescription:", error);
        res.status(500).json({ message: "Failed to send prescription" });
    }
}


