import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // For making HTTP requests
import { BASE_URL, getUserId } from '../../config';
import { formatDistanceToNow } from 'date-fns';

const Chat = ({ doctorId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const endOfMessagesRef = useRef(null);
    const userId = getUserId();

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const response = await axios.post(`${BASE_URL}/chat/`, {
                    userId,
                    doctorId,
                });
                setMessages(response.data.messages);
            } catch (err) {
                setError('Could not fetch messages');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [userId, doctorId]);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const endpoint = `${BASE_URL}/chat/sendToDoctor`;
            await axios.post(endpoint, {
                doctorId,
                userId,
                message: newMessage,
            });
            // Optimistic update (assuming message format)
            setMessages([...messages, { sender: userId, message: newMessage }]);
            setNewMessage('');
        } catch (err) {
            setError('Could not send message');
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow overflow-auto p-3 space-y-2">
                {loading && <div className="text-center">Loading...</div>}
                {error && <div className="text-red-500 text-center">{error}</div>}
                {messages.map((msg, index) => (
                    <div key={index} className={`p-2 rounded-lg ${msg.sender === userId ? 'ml-auto bg-blue-200' : 'mr-auto bg-gray-200'}`}>
                        <div>{msg.message}</div>
                        <div className="text-xs text-gray-500">{formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}</div>
                    </div>
                ))}
                <div ref={endOfMessagesRef} />
            </div>
            <form onSubmit={handleSendMessage} className="flex items-center p-3 bg-gray-100">
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 text-sm border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                    rows="1"
                ></textarea>
                <button type="submit" className="ml-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none">
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;
