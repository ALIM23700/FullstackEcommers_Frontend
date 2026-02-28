import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../App/Features/authSlice"; 

const Nav = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 px-8 py-4 flex items-center justify-between">
      <h1 className="text-white text-xl font-bold">Alim-e-Store</h1>

      <div className="flex gap-6 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm font-medium ${
              isActive ? "text-blue-400" : "text-gray-300"
            } hover:text-white`
          }
        >
          Home
        </NavLink>

        <NavLink to="/about" className="text-gray-300 hover:text-white">
          About
        </NavLink>

        <NavLink to="/contact" className="text-gray-300 hover:text-white">
          Contact
        </NavLink>

        <NavLink to="/product" className="text-gray-300 hover:text-white">
          Product
        </NavLink>

      
        {!user && (
          <>
            <NavLink to="/register" className="text-gray-300 hover:text-white">
              Register
            </NavLink>

            <NavLink
              to="/login"
              className="bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </NavLink>
          </>
        )}

       
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;