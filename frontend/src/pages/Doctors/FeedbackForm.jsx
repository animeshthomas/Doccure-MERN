import React, { useState, useContext } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { authContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const FeedbackForm = () => {
  const { token } = useContext(authContext);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:500/api/v1/reviews/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: rating,
          reviewText: reviewText,
        }),
      });

      if (response.ok) {
        // Feedback submission was successful
        toast.success('Feedback submitted successfully');

        // Reset the form fields
        setRating(0);
        setReviewText('');

        // You may want to reset the hover state as well if needed
        setHover(0);
        window.location.reload();
      } else {
        // Handle the case where the server returns an error
        console.error('Error submitting feedback');
      }
    } catch (error) {
      // Handle any network-related errors
      toast.error('Network error:', error);
    }
  };

  return (
    <form>
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          How would you rate the overall experience?
        </h3>

        <div>
          {[...Array(5).keys()].map((_, index) => {
            index += 1;

            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= ((rating && hover) || hover)
                    ? 'text-yellowColor'
                    : 'text-gray-400'
                } bg-transparent border-none outline-none text-[22px] cursor-pointer `}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Share your feedback or suggestions
        </h3>

        <textarea
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
          rows="5"
          placeholder="Write your message"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>

      <button
        type="submit"
        onClick={handleSubmitReview}
        className="btn"
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
