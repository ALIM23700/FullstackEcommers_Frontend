
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { clearRegisterSuccess, registerUser } from "../App/Features/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, registerSuccess } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      registerUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      })
    );
  };

  useEffect(() => {
    if (registerSuccess) {
      alert("Registration completed successfully! Please log in.");
      dispatch(clearRegisterSuccess());
      navigate("/login");
    }
  }, [registerSuccess, dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg"
      >
        {/* Heading */}
        <div className="text-center mb-7">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create Account
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Register to start shopping with Alim eShop
          </p>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            required
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2.5 rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        {/* Bottom text */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 font-medium cursor-pointer hover:text-blue-600"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;

