import React from "react";
import { useParams, Link } from "react-router-dom";

const PaymentSuccess = () => {
  const { tran_id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">

        {/* ✅ Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 text-green-600 p-4 rounded-full">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* ✅ Title */}
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Payment Successful!
        </h2>

        {/* ✅ Subtitle */}
        <p className="text-gray-600 mb-4">
          Your order has been placed successfully 🎉
        </p>

        {/* ✅ Transaction Card */}
        <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700 break-all">
          <span className="font-semibold">Transaction ID:</span>
          <p className="mt-1">{tran_id}</p>
        </div>

        {/* ✅ Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            Go to Home
          </Link>

          <Link
            to="/profile"
            className="w-full border border-green-600 text-green-600 hover:bg-green-50 py-2 rounded-lg transition"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;