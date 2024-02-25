import React, { useState } from 'react';
import axios from 'axios';
import HashLoader from 'react-spinners/HashLoader';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';

const AskQuries = ({ doctorEmail }) => {
  const [query, setQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = localStorage.getItem('userId');
  console.log("userId",userId)
  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Send the query to the backend
      await axios.post(`${BASE_URL}/users/send-query-to-doctor`, {
        senderId: userId, 
        doctorEmail,
        message: query
      });

      // Reset the query state after sending
      setQuery('');
      toast.success('Query sent successfully');
    } catch (error) {
      toast.error('Failed to send query');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ask-queries-container">
      <form onSubmit={handleQuerySubmit} className="query-form">
        <div className="mb-5">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your query here..."
            rows={4}
            cols={50}
            className="w-full py-3 border-b border-solid border-[#0066ff61] 
            focus:outline-none focus:border-b-primaryColor text-[16px] leading-7
            text-headingColor placeholder:text-textColor cursor-pointer"
            required
          />
        </div>
        <div className="mt-7">
          <button type="submit" className="w-full bg-primaryColor text-white text-[18px] 
          leading-[30px] rounded-lg px-4 py-3">
            {isSubmitting ? <HashLoader size={25} color="#fff" /> : "Send Query"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AskQuries;
