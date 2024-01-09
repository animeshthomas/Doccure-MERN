import React from 'react'
import avatar from '../../assets/images/avatar-icon.png'
import { formatDate } from '../../utils/formatDate'
import { AiFillStar } from 'react-icons/ai'
import FeedBackForm from './FeedBackForm'
const FeedBack = () => {
  const [showFeedBackForm, setShowFeedBackForm] = React.useState(false)
  return (
    <div className='mb-[50px]'>
      <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
        All reviews (272)
      </h4>
      <div className="flex justify-between gap-10 mb-[30px]">
        <div className="flex gap-3">
          <figure className='w-10 h-10 rounded full'>
            <img className='w-full' src={avatar} alt="" />
          </figure>
          <div>
            <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
              Ali ahmed
            </h5>
            <p className="text-[14px] leading-6 text-textColor">
              {formatDate("06-23-2023")}
            </p>
            <p className="text_para mt-3 font-medium text-[15px]">
              Good doctor, very friendly and professional. He explained everything to me in detail and made me feel comfortable. I would definitely recommend him.
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          {[...Array(5).keys()].map((index) =>
            <AiFillStar key={index} color='#0067FF' />)}
        </div>
      </div>
      {!showFeedBackForm && <div className="text-center">
        <button className="btn" onClick={() => setShowFeedBackForm(true)}>
          Give Feedback
        </button>
      </div>}
      {showFeedBackForm && <FeedBackForm />}
    </div>
  )
}

export default FeedBack