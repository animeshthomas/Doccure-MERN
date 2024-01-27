import React from 'react';
import { formateDate } from '../../utils/formateDate';

const DoctorsAbout = ({ doctorDetails }) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of
          <span className="text-blue-400 font-bold text-[24px] leading-9">
            {doctorDetails.name || 'Muhibur Rahman'}
          </span>
        </h3>
        <p className="text_para">
          {doctorDetails.description ||
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, porro sequi. Nobis, hic asperiores. Itaque optio, porro illum officiis placeat dolore nesciunt, in dicta quae qui blanditiis soluta est pariatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos beatae, totam voluptatibus eveniet, voluptatum saepe labore cumque quaerat voluptatem culpa tempora, at itaque neque aliquid molestias eum possimus architecto sunt!'}
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>

        <ul className="pt-4 md:p-5">
          {doctorDetails.education &&
            doctorDetails.education.map((education, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
              >
                <div>
                  <span className="text-blue-400 text-[15px] leading-6 font-semibold">
                    {formatDate(education.startDate)} - {formateDate(education.endDate)}
                  </span>
                  <p className="text-[15px] leading-6 font-medium text-textColor">
                    {education.degree}
                  </p>
                </div>
                <p className="text-[14px] leading-5 font-medium text-textColor">
                  {education.institution}
                </p>
              </li>
            ))}
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experience
        </h3>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          {doctorDetails.experience &&
            doctorDetails.experience.map((experience, index) => (
              <li key={index} className="p-4 rounded bg-[#fff9ea]">
                <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                  {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                </span>
                <p className="text-[16px] leading-6 font-medium text-textColor">
                  {experience.position}
                </p>
                <p className="text-[14px] leading-5 font-medium text-textColor">
                  {experience.organization}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorsAbout;
