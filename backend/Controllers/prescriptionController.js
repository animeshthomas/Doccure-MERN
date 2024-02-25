import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Prescription from "../models/prescriptionSchema.js"; 

export const providePrescription = async (req, res) => {
    try {
        const { doctorId, userId, prescriptions } = req.body;
        
        if (!doctorId || !userId || !prescriptions || !Array.isArray(prescriptions) || prescriptions.length === 0) {
            return res.status(400).json({ error: "DoctorId, userId, and prescriptions are required as a non-empty array" });
        }

        const doctor = await Doctor.findById(doctorId);
        const user = await User.findById(userId);
        
        if (!doctor || !user) {
            return res.status(404).json({ error: "Doctor or user not found" });
        }

        const newPrescription = new Prescription({
            doctor: doctor._id,
            patient: user._id,
            prescriptions: prescriptions
        });

        await newPrescription.save();

        res.status(200).json({ message: "Prescription sent successfully" });
    } catch (error) {
        console.error("Error sending prescription:", error);
        res.status(500).json({ error: "Failed to send prescription" });
    }
}
