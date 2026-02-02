import React from "react";

const About = () => {
  return (
    <div className="flex flex-col justify-center items-center p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">
          About Alim eShop
        </h1>
        <p className="text-gray-700 mb-4">
          <strong>Alim eShop</strong> is a modern online store built to provide a
          seamless shopping experience for customers. We focus on quality
          products, smooth navigation, and secure payment options.
        </p>
        <p className="text-gray-700 mb-4">
          This platform was designed and developed by <strong>Md. Abdul Alim</strong>,
          a passionate web developer dedicated to creating user-friendly and
          responsive web applications.
        </p>
        <p className="text-gray-700">
          Our mission is to bring the best products to our customers with
          simplicity and efficiency, ensuring a trustworthy e-commerce experience.
        </p>
      </div>
    </div>
  );
};

export default About;
