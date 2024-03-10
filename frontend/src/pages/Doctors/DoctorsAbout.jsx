import React, { useState } from 'react';
import { formateDate } from '../../utils/formateDate';

const CertificateModal = ({ src, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  if (!src) return null;

  const toggleZoom = () => setIsZoomed(!isZoomed);

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-60 flex justify-center items-center p-4">
      <div className="relative w-auto max-w-4xl max-h-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-4 py-2 sm:p-6">
          <img
            src={src}
            alt="Certificate"
            className={`mx-auto max-w-full h-auto transition-transform duration-300 ease-in-out cursor-pointer ${isZoomed ? 'scale-125' : 'scale-100'}`}
            onDoubleClick={toggleZoom}
          />
          <div className="mt-4 flex justify-center">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900 transition ease-in-out duration-150 flex items-center justify-center p-2 rounded-full"
              aria-label="Close">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="ml-2">Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const DoctorsAbout = ({ name, about, qualifications, experiences }) => {
  const [certificateSrc, setCertificateSrc] = useState('');

  const openCertificate = (src) => setCertificateSrc(src);
  const closeCertificate = () => setCertificateSrc('');

  return (
    <div>
      {certificateSrc && <CertificateModal src={certificateSrc} onClose={closeCertificate} />}
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
                {item.certificate && (
                  <button
                    onClick={() => openCertificate(item.certificate)}
                    className="mt-2 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                  >
                    View Certificate
                  </button>
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
              {item.certificate && (
                <button
                  onClick={() => openCertificate(item.certificate)}
                  className="mt-2 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  View Certificate
                </button>
              )}

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorsAbout;
