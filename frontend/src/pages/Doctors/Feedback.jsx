import { useState, useEffect } from "react";
import avatar from "../../assets/images/avatar-icon.png";
import { formateDate } from '../../utils/formateDate';
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

const Feedback = () => {
  const [reviews, setReviews] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:500/api/v1/reviews");
        const data = await response.json();
        console.log(data)

        // Ensure that data.data is an array before setting reviews state
        if (Array.isArray(data.data)) {
          setReviews(data.data);
        } else {
          console.error('Invalid data structure received:', data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({reviews.length})
        </h4>

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="flex justify-between gap-10 mb-[30px]">
              <div className="flex gap-3">
                <figure className="w-10 h-10 rounded-full">
                  <img className="w-full" src={review.user.photo} alt="" />
                </figure>

                <div>
                  <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                    {review.user.name}
                  </h5>
                  <p className="text-[14px] leading-6 text-textColor">
                    {formateDate(review.createdAt)}
                  </p>
                  <p className="text__para mt-3 font-medium text-[15px]">
                    {review.reviewText}
                  </p>
                </div>
              </div>

              <div className="flex gap-1">
                {[...Array(review.rating).keys()].map((index) => (
                  <AiFillStar key={index} color='#0067FF' />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>

      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}

      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
};

export default Feedback;
