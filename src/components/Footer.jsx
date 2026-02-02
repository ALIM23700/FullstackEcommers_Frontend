import React from "react";
import { FaFacebook, FaYoutube, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white ">
      <div className="max-w-7xl mx-auto  px-4 py-8 sm:flex sm:justify-between sm:items-center">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-2xl font-bold">Alim e-Store</h2>
          <p className="text-sm mt-1">© 2025 Md. Abdul Alim. All rights reserved.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <p className="mb-2 sm:mb-0 sm:mr-4">Follow us:</p>
          <div className="flex space-x-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="hover:text-blue-500 transition-colors" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube className="hover:text-red-500 transition-colors" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-500 transition-colors" />
            </a>
            <a href="https://wa.me/01791723700" target="_blank" rel="noreferrer">
              <FaWhatsapp className="hover:text-green-500 transition-colors" />
            </a>
          </div>
        </div>

        <div className="mt-4 sm:mt-0">
          <p>Email: abdulalim23700@gmail.com</p>
          <p>Phone/WhatsApp: 01791723700</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
