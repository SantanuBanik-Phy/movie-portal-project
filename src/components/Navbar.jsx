import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false); // State to control mobile menu

  return (
    <div className="w-full bg-gradient-to-r from-[#19284a] to-[#33526d] py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-0">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-3xl font-bold text-white tracking-wider transition-all duration-300 hover:text-yellow-400">
            Movie<span className="text-yellow-400">Portal</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `p-2 rounded-md text-white transition-all duration-300 ${
                isActive
                  ? "bg-yellow-500 text-black shadow-xl"
                  : "hover:text-yellow-400 hover:bg-gray-700"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-movies"
            className={({ isActive }) =>
              `p-2 rounded-md text-white transition-all duration-300 ${
                isActive
                  ? "bg-yellow-500 text-black shadow-xl"
                  : "hover:text-yellow-400 hover:bg-gray-700"
              }`
            }
          >
            All Movies
          </NavLink>
          {user && user.email && (
            <>
              <NavLink
                to="/add-movie"
                className={({ isActive }) =>
                  `p-2 rounded-md text-white transition-all duration-300 ${
                    isActive
                      ? "bg-yellow-500 text-black shadow-xl"
                      : "hover:text-yellow-400 hover:bg-gray-700"
                  }`
                }
              >
                Add Movie
              </NavLink>
              <NavLink
                to="/my-favorites"
                className={({ isActive }) =>
                  `p-2 rounded-md text-white transition-all duration-300 ${
                    isActive
                      ? "bg-yellow-500 text-black shadow-xl"
                      : "hover:text-yellow-400 hover:bg-gray-700"
                  }`
                }
              >
                My Favorites
              </NavLink>
            </>
          )}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `p-2 rounded-md text-white transition-all duration-300 ${
                isActive
                  ? "bg-yellow-500 text-black shadow-xl"
                  : "hover:text-yellow-400 hover:bg-gray-700"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `p-2 rounded-md text-white transition-all duration-300 ${
                isActive
                  ? "bg-yellow-500 text-black shadow-xl"
                  : "hover:text-yellow-400 hover:bg-gray-700"
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* User Section */}
        <div className="hidden lg:flex items-center space-x-4">
          {user && user.email ? (
            <div className="flex items-center space-x-3">
              <div
                className="tooltip tooltip-bottom"
                data-tip={user?.displayName || "User"}
              >
                <img
                  src={user.photoURL}
                  className="w-10 h-10 rounded-full border-2 border-yellow-400"
                  alt="User Avatar"
                />
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-500 transition-all duration-300 shadow-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-3">
              <Link
                to="/auth/login"
                className="px-4 py-2 bg-gray-200 text-black font-medium rounded-lg hover:bg-yellow-500 transition-all duration-300 shadow-md"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="px-4 py-2 bg-gray-200 text-black font-medium rounded-lg hover:bg-yellow-500 transition-all duration-300 shadow-md"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
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
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-gray-800 text-white py-4">
          <ul className="flex flex-col space-y-4 items-center">
            <li>
              <NavLink
                to="/"
                className="hover:bg-gray-700 px-4 py-2 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-movies"
                className="hover:bg-gray-700 px-4 py-2 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                All Movies
              </NavLink>
            </li>
            {user && user.email && (
              <>
                <li>
                  <NavLink
                    to="/add-movie"
                    className="hover:bg-gray-700 px-4 py-2 rounded-md"
                    onClick={() => setMenuOpen(false)}
                  >
                    Add Movie
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-favorites"
                    className="hover:bg-gray-700 px-4 py-2 rounded-md"
                    onClick={() => setMenuOpen(false)}
                  >
                    My Favorites
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink
                to="/about"
                className="hover:bg-gray-700 px-4 py-2 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="hover:bg-gray-700 px-4 py-2 rounded-md"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
            {user && user.email ? (
              <li className="flex flex-col items-center space-y-2">
                <div className="tooltip tooltip-bottom" data-tip={user.displayName || "User"}>
                  <img
                    src={user.photoURL}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-yellow-400"
                  />
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-500"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/auth/login"
                    className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-yellow-500"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth/register"
                    className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-yellow-500"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
