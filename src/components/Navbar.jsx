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
    <div className="w-full bg-gradient-to-r from-[#19284a] to-[#33526d] py-3">
      <div className="navbar px-4 lg:px-12">
        {/* Logo and Brand */}
        <div className="navbar-start">
          <Link to="/">
            <span className="text-3xl font-bold text-white tracking-wider transition-all duration-300 hover:text-yellow-400">
              Movie <span className="text-yellow-400">Por</span>tal
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu text-white menu-horizontal space-x-8 text-lg">
            <NavLink
              to="/"
              className="hover:text-gray-200 transition-all duration-300 p-2 rounded-md hover:shadow-xl hover:bg-gray-700"
              activeClassName="bg-yellow-400 text-black shadow-xl"
            >
              Home
            </NavLink>
            <NavLink
              to="/all-movies"
              className="hover:text-gray-200 transition-all duration-300 p-2 rounded-md hover:shadow-xl hover:bg-gray-700"
              activeClassName="bg-yellow-400 text-black shadow-xl"
            >
              All Movies
            </NavLink>
            {user && user.email && (
              <>
                <NavLink
                  to="/add-movie"
                  className="hover:text-gray-200 transition-all duration-300 p-2 rounded-md hover:shadow-xl hover:bg-gray-700"
                  activeClassName="bg-yellow-400 text-black shadow-xl"
                >
                  Add Movie
                </NavLink>
                <NavLink
                  to="/my-favorites"
                  className="hover:text-gray-200 transition-all duration-300 p-2 rounded-md hover:shadow-xl hover:bg-gray-700"
                  activeClassName="bg-yellow-400 text-black shadow-xl"
                >
                  My Favorites
                </NavLink>
              </>
            )}
            <NavLink
              to="/about"
              className="hover:text-gray-200 transition-all duration-300 p-2 rounded-md hover:shadow-xl hover:bg-gray-700"
              activeClassName="bg-yellow-400 text-black shadow-xl"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="hover:text-gray-200 transition-all duration-300 p-2 rounded-md hover:shadow-xl hover:bg-gray-700"
              activeClassName="bg-yellow-400 text-black shadow-xl"
            >
              Contact
            </NavLink>
          </ul>
        </div>

        {/* User Section */}
        <div className="ml-10 navbar-end space-x-6">
          {user && user.email ? (
            <div className="flex flex-col md:flex-row justify-center gap-2 items-center space-x-4">
              <div className="tooltip tooltip-bottom" data-tip={displayName}>
                <img
                  src={user.photoURL}
                  className="w-12 h-12 rounded-full cursor-pointer border-2 border-yellow-400"
                  alt="User"
                />
              </div>
              <button
                onClick={logout}
                className="btn bg-yellow-400 hover:bg-yellow-500 rounded-full transition-all duration-300 shadow-md"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/auth/login"
                className="btn bg-gray-200 hover:bg-yellow-500 text-black rounded-full transition-all duration-300 shadow-md"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="btn bg-gray-200 hover:bg-yellow-500 text-black rounded-full transition-all duration-300 shadow-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Dropdown for Small Screens */}
        <div className="navbar-end z-10 lg:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-4 text-yellow-500"
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
              className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-base-100 rounded-box w-52 text-black"
            >
              <li>
                <NavLink
                  to="/"
                  className="hover:bg-gray-700 p-2 rounded-md"
                  activeClassName="bg-yellow-400 text-black shadow-xl"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/all-movies"
                  className="hover:bg-gray-700 p-2 rounded-md"
                  activeClassName="bg-yellow-400 text-black shadow-xl"
                >
                  All Movies
                </NavLink>
              </li>
              {user && user.email && (
                <>
                  <li>
                    <NavLink
                      to="/add-movie"
                      className="hover:bg-gray-700 p-2 rounded-md"
                      activeClassName="bg-yellow-400 text-black shadow-xl"
                    >
                      Add Movie
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my-favorites"
                      className="hover:bg-gray-700 p-2 rounded-md"
                      activeClassName="bg-yellow-400 text-black shadow-xl"
                    >
                      My Favorites
                    </NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink
                  to="/about"
                  className="hover:bg-gray-700 p-2 rounded-md"
                  activeClassName="bg-yellow-400 text-black shadow-xl"
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  className="hover:bg-gray-700 p-2 rounded-md"
                  activeClassName="bg-yellow-400 text-black shadow-xl"
                >
                  Contact
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
