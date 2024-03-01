
import Message from "../models/MessageSchema.js";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const sendMessageToDoctor = async (req, res) => {
  try {
    const { doctorId, message } = req.body;
    const { userId } = req.body; // Or however you are passing the userId
    const senderUser = await User.findById(userId);
    const receiverDoctor = await Doctor.findById(doctorId);

    // Check both senderUser and receiverDoctor for existence
    if (!senderUser || !receiverDoctor) {
      return res.status(404).json({ error: "Sender or receiver not found" });
    }

    const newMessage = new Message({
      sender: senderUser._id,
      senderType: "User",
      receiver: receiverDoctor._id,
      receiverType: "Doctor",
      message,
    });

    await newMessage.save();

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};


export const sendMessageToUser = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const doctorId = req.body.doctorId;

    const senderDoctor = await Doctor.findById(doctorId);
    const receiverUser = await User.findById(userId);

    if (!senderDoctor || !receiverUser) {
      return res.status(404).json({ error: "Sender or receiver not found" });
    }

    const newMessage = new Message({
      sender: senderDoctor._id,
      senderType: "Doctor",
      receiver: receiverUser._id,
      receiverType: "User",
      message,
    });

    await newMessage.save();

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

export const getChatMessages = async (req, res) => {
  try {
    const { userId, doctorId } = req.body;

    if (!userId || !doctorId) {
      return res.status(400).json({ error: "Missing userId or doctorId parameters" });
    }

    const userMessages = await Message.find({
      sender: userId,
      receiver: doctorId,
      senderType: "User",
      receiverType: "Doctor"
    });

    const doctorMessages = await Message.find({
      sender: doctorId,
      receiver: userId,
      senderType: "Doctor",
      receiverType: "User"
    });

    const messages = [...userMessages, ...doctorMessages];

    // Sort messages by createdAt timestamp
    messages.sort((a, b) => a.createdAt - b.createdAt);

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, error: "Failed to fetch messages" });
  }
};




export const getAllPatients = async (req, res) => {
  try {
    // Get doctorId from request params
    const { doctorId } = req.params;

    // Find all patients
    const patients = await User.find({ role: "patient" });

    // Iterate over patients to find their last sent message to the specified doctor
    const patientsWithDetails = await Promise.all(patients.map(async (patient) => {
      // Find last message from patient to doctor
      const lastMessage = await Message.findOne({
        sender: patient._id,
        senderType: "User", // Assuming patients are users
        receiver: doctorId,
        receiverType: "Doctor", // Assuming doctorId is passed as a parameter
      }).sort({ createdAt: -1 }).limit(1);

      return {
        _id: patient._id,
        email: patient.email,
        name: patient.name,
        phone: patient.phone,
        photo: patient.photo,
        lastMessage: lastMessage ? lastMessage.message : null,
        lastMessageTime: lastMessage ? lastMessage.createdAt : null,
      };
    }));

    res.status(200).json({ success: true, patients: patientsWithDetails });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ success: false, error: "Failed to fetch patients" });
  }
};
