import { formateDate } from '../../utils/formateDate'

const DoctorsAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          About of
          <span className="text-blue-400 font-bold text-[24px] leading-9">
            {name}
          </span>
        </h3>
        <p className="text_para">
          {about}
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>

        <ul className="pt-4 md:p-5">
          {qualifications?.map((item, index) => (
            <li key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
              <div>
                <span className="text-blue-400 text-[15px] leading-6 font-semibold">
                  {formateDate(item.startingDate)} - {formateDate(item.endingDate)}
                </span>
                <p className="text-[15px] leading-6 font-medium text-textColor">
                  {item.degree}
                </p>
                {/* View Certificate Button */}
                {item.certificateUrl && (
                  <a href={item.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out mt-2 inline-block">
                    View Certificate
                  </a>
                )}
              </div>
              <p className="text-[14px] leading-5 font-medium text-textColor">
                {item.university}
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
          {experiences?.map((item, index) => (
            <li key={index} className="p-4 rounded bg-[#fff9ea]">
              <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                {formateDate(item.startingDate)} - {formateDate(item.endingDate)}
              </span>
              <p className="text-[16px] leading-6 font-medium text-textColor">
                {item.position}
              </p>
              <p className="text-[14px] leading-5 font-medium text-textColor">
                {item.hospital}
              </p>
              {/* View Certificate Button */}
             
                <a href="" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out mt-2 inline-block">
                  View Certificate
                </a>
            
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorsAbout;
