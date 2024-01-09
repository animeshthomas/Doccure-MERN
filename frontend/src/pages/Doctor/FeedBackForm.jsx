import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

const FeedBackForm = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState('');

    const handleRatingClick = (ratingValue) => {
        setRating(ratingValue);
    };

    const handleRatingHover = (ratingValue) => {
        setHover(ratingValue);
    };

    const handleRatingLeave = () => {
        setHover(0);
    };

    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Add your logic for submitting the form, e.g., sending data to the server
        console.log('Rating:', rating);
        console.log('Review:', review);

        // Optionally, you can reset the form state
        setRating(0);
        setHover(0);
        setReview('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
                    How would you rate the overall experience?*
                </h3>
                <div>
                    {[...Array(5).keys()].map((index) => {
                        const ratingValue = index + 1;
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleRatingClick(ratingValue)}
                                onMouseEnter={() => handleRatingHover(ratingValue)}
                                onMouseLeave={handleRatingLeave}
                                className={`${index + 1 <= (hover || rating) ? 'text-yellowColor' : 'text-gray-400'} bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                            >
                                <span>
                                    <AiFillStar />
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-6">
                    Write a review*
                </h3>
                <textarea
                    name="review"
                    id="review"
                    cols="30"
                    rows="10"
                    value={review}
                    onChange={handleReviewChange}
                    className="w-full border border-gray-200 rounded-md outline-none p-4"
                ></textarea>
            </div>

            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">
                Submit
            </button>
        </form>
    );
};

export default FeedBackForm;
