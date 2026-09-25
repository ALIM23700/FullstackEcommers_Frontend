
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../App/Features/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (user) {
      alert("Login successful");
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 py-8 sm:px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg"
      >
        {/* Heading */}
        <div className="text-center mb-7">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Login to continue to Alim eShop
          </p>
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

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2.5 rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

