
import React from "react";
import alim2 from "../assets/new.png";

const About = () => {
  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-5 sm:p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">

          {/* Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-2 sm:-inset-3 bg-blue-100 rounded-full"></div>

              <img
                src={alim2}
                alt="Md. Abdul Alim"
                className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 object-cover rounded-full border-4 border-white shadow-md"
              />
            </div>
          </div>

          {/* Content */}
          <div className="text-center md:text-left">

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-5">
              About <span className="text-blue-600">Alim eShop</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7 mb-4">
              <strong className="text-gray-800">Alim eShop</strong> is a
              modern online store built to provide a simple and seamless
              shopping experience for customers.
            </p>

            <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7 mb-4">
              We focus on quality products, smooth navigation, responsive
              design, and a reliable shopping experience.
            </p>

            <p className="text-sm sm:text-base text-gray-600 leading-6 sm:leading-7 mb-6">
              This platform was designed and developed by{" "}
              <strong className="text-gray-800">Md. Abdul Alim</strong>,
              a passionate web developer dedicated to building modern,
              user-friendly and responsive web applications.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-3">

              <div className="border border-gray-200 rounded-lg p-3 text-center">
                <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                  Quality
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Good Products
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-3 text-center">
                <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                  Simple
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Easy Shopping
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-3 text-center">
                <h3 className="font-semibold text-sm sm:text-base text-gray-800">
                  Secure
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Safe Experience
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;

