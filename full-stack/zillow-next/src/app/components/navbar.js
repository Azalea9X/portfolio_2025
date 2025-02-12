import React from "react";
import Grid from "./grid"; 
import ZillowLogo
 from "./zillowComponent";
const Navbar = () => {
  return (
    <>   <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <a className="text-xl font-bold text-gray-800" href="#">
<ZillowLogo />
        </a>

        <button
          className="text-gray-800 focus:outline-none md:hidden"
          type="button"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <div className="hidden md:flex space-x-4">
          <a className="text-gray-800 hover:text-gray-600" href="/">
            Home
          </a>
          <a className="text-gray-800 hover:text-gray-600" href="#">
            About
          </a>
          <a className="text-gray-800 hover:text-gray-600" href="#">
            Services
          </a>
        </div>
      </div>
    </nav>

    </>
 
  );
};

export default Navbar;
