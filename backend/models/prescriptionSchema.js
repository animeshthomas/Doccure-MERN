import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
    patient: { type: mongoose.Types.ObjectId, ref: "Patient" },
    doctor: { type: mongoose.Types.ObjectId, ref: "Doctor" },
    prescriptions: [{
        medicine: { type: String, required: true },
        noofdays: { type: String },
        dosage: { type: String },
        frequency: { type: String }
    }]
});


export default mongoose.model("Prescription", prescriptionSchema);