import React, { useContext } from 'react';
import { BiMenu } from 'react-icons/bi';
import { authContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Tabs = ({ tab, setTab }) => {
    const { dispatch } = useContext(authContext); // Importing useContext hook
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        toast.success('Logged out successfully');
        navigate('/');
    };

    return (
        <div>
            <div className='flex lg:flex-col gap-2 p-3 lg:p-6 bg-white border border-slate-100 shadow-xl rounded-3xl overflow-x-auto lg:overflow-visible'>
                <button
                    onClick={() => setTab('overview')}
                    className={`w-full py-3 px-5 text-sm font-semibold rounded-2xl transition-all whitespace-nowrap text-left ${
                        tab === "overview"
                            ? "bg-primaryColor text-white shadow-md shadow-primaryColor/25"
                            : "text-slate-600 hover:bg-slate-100"
                    }`}>
                    Overview
                </button>
                <button
                    onClick={() => setTab('appointments')}
                    className={`w-full py-3 px-5 text-sm font-semibold rounded-2xl transition-all whitespace-nowrap text-left ${
                        tab === "appointments"
                            ? "bg-primaryColor text-white shadow-md shadow-primaryColor/25"
                            : "text-slate-600 hover:bg-slate-100"
                    }`}>
                    Appointments
                </button>
                <button
                    onClick={() => setTab('chat')}
                    className={`w-full py-3 px-5 text-sm font-semibold rounded-2xl transition-all whitespace-nowrap text-left ${
                        tab === "chat"
                            ? "bg-primaryColor text-white shadow-md shadow-primaryColor/25"
                            : "text-slate-600 hover:bg-slate-100"
                    }`}>
                    Patient Chats
                </button>
                <button
                    onClick={() => setTab('settings')}
                    className={`w-full py-3 px-5 text-sm font-semibold rounded-2xl transition-all whitespace-nowrap text-left ${
                        tab === "settings"
                            ? "bg-primaryColor text-white shadow-md shadow-primaryColor/25"
                            : "text-slate-600 hover:bg-slate-100"
                    }`}>
                    Doctor Profile
                </button>

                <div className="hidden lg:block mt-12 pt-6 border-t border-slate-100 w-full space-y-2.5">
                    <button 
                        onClick={handleLogout}
                        className="w-full py-3 text-sm font-semibold rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md">
                        Logout
                    </button>
                    <button className="w-full py-2.5 text-xs font-semibold rounded-2xl text-red-600 hover:bg-red-50 transition-colors">
                        Delete account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
