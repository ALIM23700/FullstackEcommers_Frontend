import React from "react";
import { useParams, Link } from "react-router-dom";

const PaymentFail = () => {
  const { tran_id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">

        {/* ❌ Fail Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 text-red-600 p-4 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        {/* ❌ Title */}
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Payment Failed!
        </h2>

        {/* ❌ Subtitle */}
        <p className="text-gray-600 mb-4">
          Something went wrong with your payment 😔
        </p>

        {/* ❌ Transaction Info */}
        {tran_id && (
          <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700 break-all">
            <span className="font-semibold">Transaction ID:</span>
            <p className="mt-1">{tran_id}</p>
          </div>
        )}

        {/* ❌ Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            to="/cart"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="w-full border border-red-600 text-red-600 hover:bg-red-50 py-2 rounded-lg transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;