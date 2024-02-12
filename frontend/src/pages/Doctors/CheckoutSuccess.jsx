import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-green-500 mx-auto"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.636 13.364a1 1 0 11-1.414-1.414l-2-2a1 1 0 111.414-1.414l1.293 1.293 3.793-3.793a1 1 0 111.414 1.414l-4.5 4.5z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-xl font-semibold mt-4 text-gray-800 text-center">
          Payment Successful
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Thank Your for using doccure.
        </p>
        <div className="mt-6 flex justify-center">
          <Link to="/home" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Go Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
