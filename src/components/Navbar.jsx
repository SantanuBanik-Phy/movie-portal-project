import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");

  useEffect(() => {
    setDisplayName(user?.displayName || "");
  }, [user]);

  return (
    <div className="w-full bg-gradient-to-r from-[#0B98AC] to-[#A8EB12] py-2">
      <div className="navbar px-4 lg:px-12">
        {/* Logo and Brand */}
        <div className="navbar-start">
          <Link to="/">
            
            <span className="text-2xl font-bold">Movie <span className="text-white">Por</span>tal</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-6 text-lg">
            <NavLink to="/" className="hover:text-gray-200">
              Home
            </NavLink>
            <NavLink to="/all-movies" className="hover:text-gray-200">
              All Movies
            </NavLink>
            <NavLink to="/add-movie" className="hover:text-gray-200">
              Add Movie
            </NavLink>
            <NavLink to="/my-favorites" className="hover:text-gray-200">
              My Favorites
            </NavLink>
            <NavLink to="/about" className="hover:text-gray-200">
              About
            </NavLink>
          </ul>
        </div>

        {/* User Section */}
        <div className="navbar-end space-x-4">
          {/* User Profile or Login/Register */}
          {user && user?.email ? (
            <div className="flex items-center space-x-4">
              <div className="tooltip tooltip-bottom" data-tip={displayName}>
                <img
                  src={user?.photoURL}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="User"
                />
              </div>
              <button
                onClick={logout}
                className="btn btn-sm bg-green-500 hover:bg-green-600 text-white rounded-full"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/auth/login"
                className="btn btn-sm bg-slate-200 hover:bg-green-600 text-black rounded-full"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="btn btn-sm bg-slate-200 hover:bg-green-600 text-black rounded-full"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Dropdown for Small Screens */}
        <div className="navbar-end z-10  lg:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black"
            >
              <li>
                <NavLink to="/" className="hover:bg-gray-200">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/all-movies" className="hover:bg-gray-200">
                  All Movies
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-movie" className="hover:bg-gray-200">
                  Add Movie
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-favorites" className="hover:bg-gray-200">
                  My Favorites
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:bg-gray-200">
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
