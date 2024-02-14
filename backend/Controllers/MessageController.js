
import Message from "../models/MessageSchema.js";
import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const sendMessageToDoctor = async (req, res) => {
  try {
    const { doctorId, message } = req.body;
    const userId = '65ca0aba1e191b66baf01d95'

    const senderUser = await User.findById(userId);
    const receiverDoctor = await Doctor.findById(doctorId);

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
    const doctorId = '65c1f61da1c328455c4c4454'

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
      "sender": userId,
      "receiver": doctorId,
      "senderType": "User",
      "receiverType": "Doctor"
    }).sort({ createdAt: 1 });

    const doctorMessages = await Message.find({
      "sender": doctorId,
      "receiver": userId,
      "senderType": "Doctor",
      "receiverType": "User"
    }).sort({ createdAt: 1 });

    const messages = [...userMessages, ...doctorMessages];

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, error: "Failed to fetch messages" });
  }
};
