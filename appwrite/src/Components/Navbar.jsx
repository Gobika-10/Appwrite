import React from "react";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-slate-900 text-white shadow-md">

      {/* Logo */}
      <h2 className="font-bold text-2xl tracking-wide">
        Appwrite
      </h2>

      {/* Menu */}
      <ul className="flex gap-8 text-lg font-medium">

        <li className="cursor-pointer hover:text-blue-400 transition duration-200">
          Home
        </li>

        <li className="cursor-pointer hover:text-blue-400 transition duration-200">
          About
        </li>

        <li className="cursor-pointer hover:text-blue-400 transition duration-200">
          Contact
        </li>

        <li className="cursor-pointer bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 transition duration-200">
          Login
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;