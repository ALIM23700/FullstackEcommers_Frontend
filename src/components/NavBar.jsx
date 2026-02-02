import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="bg-gray-900 px-8 py-4 flex items-center justify-between">
    
      <h1 className="text-white text-xl font-bold">Alim-e-Store</h1>

     
      <div className="flex gap-6">
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

        <NavLink to="/register" className="text-gray-300 hover:text-white">
          Register
        </NavLink>

        <NavLink
          to="/login"
          className="bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </NavLink>
      </div>
    </nav>
  )
}

export default Nav
