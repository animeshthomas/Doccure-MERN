import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL, getUserId } from '../../config';
import { formatDistanceToNow } from 'date-fns';

const ViewChats = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const doctorId = getUserId();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/chat/getAllPatients/${doctorId}/`);
                if (response.data.success) {
                    setPatients(response.data.patients);
                }
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };

        fetchPatients();
    }, [doctorId]);

    const fetchMessages = async (patientId) => {
        try {
            const response = await axios.post(`${BASE_URL}/chat/`, {
                userId: patientId,
                doctorId: doctorId
            });
            if (response.data.success) {
                setMessages(response.data.messages);
                setShowModal(true);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleChatClick = (patientId) => {
        setSelectedPatient(patientId);
        fetchMessages(patientId);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const response = await axios.post(`${BASE_URL}/chat/sendToUser`, {
                userId: selectedPatient,
                doctorId: doctorId,
                message: newMessage,
            });
            if (response.data.message === "Message sent successfully") {
                setMessages([...messages, { sender: doctorId, message: newMessage, createdAt: new Date() }]);
                setNewMessage('');
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="max-w-md mx-auto font-sans">
            <div className="divide-y divide-gray-200">
                {patients.map(patient => (
                    <div key={patient._id} onClick={() => handleChatClick(patient._id)} className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex-shrink-0">
                            <img className="h-12 w-12 rounded-full" src={patient.photo} alt={patient.name} />
                        </div>
                        <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                                <h5 className="text-lg font-semibold text-gray-900">{patient.name}</h5>
                                <span className="text-sm text-gray-500">
                                    {formatDistanceToNow(new Date(patient.lastMessageTime), { addSuffix: true })}
                                </span>
                            </div>
                            <p className="text-gray-500">{patient.lastMessage || "No messages yet"}</p>
                        </div>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4 z-10">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-lg w-full">
                        <div className="p-4">
                            <h3 className="text-xl font-bold">Conversation</h3>
                            <div className="my-2 h-64 overflow-y-auto">
                                {messages.map((message, index) => (
                                    <div key={index} className={`p-2 ${message.senderType === 'Doctor' ? 'text-right' : 'text-left'}`}>
                                        <span className={`inline-block text-sm rounded-md p-2 ${message.sender === doctorId ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'}`}>
                                            {message.message}
                                        </span>
                                        <span className="block text-xs text-gray-500">{new Date(message.createdAt).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <form onSubmit={sendMessage} className="mt-4">
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg"
                                    placeholder="Type your message here..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <div className="flex justify-end mt-2">
                                    <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-150">Send</button>
                                </div>
                            </form>
                        </div>
                        <div className="flex justify-end border-t p-2">
                            <button onClick={() => setShowModal(false)} className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-150">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewChats;
