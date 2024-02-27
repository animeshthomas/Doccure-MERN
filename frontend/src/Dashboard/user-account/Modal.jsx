import React, { useState } from 'react';
import { BASE_URL, token } from '../../config';
import { toast } from 'react-toastify';


const Modal = ({ userId, isOpen, onClose, onUpgradeNow }) => {
    const [isLoading, setIsLoading] = useState(false);

    const premiumHandler = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}/users/upgrade-to-premium/`, {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId
                })
            });
            const data = await response.json();
            console.log(data)
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }
            if (data.session.url) { 
                window.location.href = data.session.url;
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-8 rounded-md">
                <h2 className="text-lg font-semibold mb-4">Upgrade to Premium</h2>
                <p className="mb-4">Unlock premium features like asking queries to doctors and viewing insights about the system.</p>
                <div className="flex justify-between">
                    <button onClick={premiumHandler} className="bg-primaryColor text-white py-2 px-4 rounded-md mr-4">{isLoading ? "Loading..." : "Upgrade Now"}</button>
                    <button onClick={() => onClose(false)} className="bg-gray-300 text-[#181A1E] py-2 px-4 rounded-md">Upgrade Later</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;


