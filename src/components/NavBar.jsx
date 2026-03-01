import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../App/Features/authSlice";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-gray-700 text-white flex flex-col sm:flex-row justify-between items-center p-4">
      <div className="flex justify-between w-full sm:w-auto items-center">
        <h1 className="text-4xl font-bold">
          Alim<span className="text-orange-500"> e</span>-Store
        </h1>
        <FontAwesomeIcon
          icon={menuOpen ? faXmark : faBars}
          size="2x"
          className="sm:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>

      <div
        className={`flex-col sm:flex-row sm:flex items-center w-full sm:w-auto mt-4 sm:mt-0 ${
          menuOpen ? "flex" : "hidden sm:flex"
        }`}
      >
        <NavLink to="/" className="sm:ml-8 mb-2 sm:mb-0" end>
          Home
        </NavLink>
        <NavLink to="/about" className="sm:ml-8 mb-2 sm:mb-0">
          About
        </NavLink>
        <NavLink to="/contact" className="sm:ml-8 mb-2 sm:mb-0">
          Contact
        </NavLink>
        <NavLink to="/product" className="sm:ml-8 mb-2 sm:mb-0">
          Product
        </NavLink>

        {!user && (
          <>
            <NavLink to="/register" className="sm:ml-8 mb-2 sm:mb-0">
              Register
            </NavLink>
            <NavLink to="/login" className="sm:ml-8 mb-2 sm:mb-0">
              Login
            </NavLink>
          </>
        )}

        {user && (
          <>
            <span className="sm:ml-8 mb-2 sm:mb-0 text-yellow-300 font-semibold">
              Hello, {user.name}
            </span>

            {user.role === "admin" ? (
              <NavLink
                to="/admin/dashboard"
                className="sm:ml-4 mb-2 sm:mb-0 text-white font-semibold hover:text-yellow-300"
              >
                Admin Dashboard
              </NavLink>
            ) : (
              <NavLink
                to="/profile"
                className="sm:ml-4 mb-2 sm:mb-0 text-white font-semibold hover:text-yellow-300"
              >
                Profile
              </NavLink>
            )}
          </>
        )}

        <NavLink to="/cart" className="sm:ml-8 mb-2 sm:mb-0 relative">
          Cart
          {totalCartItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalCartItems}
            </span>
          )}
        </NavLink>

        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 ml-4"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
