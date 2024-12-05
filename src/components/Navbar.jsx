import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import "./Navbar.css";
// import logo from "../assets/sign.png"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);


  const [displayName, setDisplayName] = useState(user?.displayName || "");


  useEffect(() => {
    setDisplayName(user?.displayName || "");
  }, [user]);

  return (
    <div className="w-11/12 mx-auto">
      <div className="md:navbar flex md:flex-row justify-center items-center flex-col text-white ">
      <div className="md:navbar-start flex flex-col md:flex-row justify-center items-center ">
        <img src="" className="w-10 h-10" alt="" />
        <Link to="/" className="btn btn-ghost normal-case text-2xl">
         Movie Portal
        </Link> 
      </div>
      <div className="md:navbar-center lg:flex">
        <ul className="menu menu-horizontal  md:space-x-8 space-x-3 mb-4 text-lg">
          
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/all-movies" >All Movies</NavLink>
          
          
            
                  <NavLink to="/add-movie">Add Movie</NavLink>
                    
                    <NavLink to="/my-favorites">My Favorites</NavLink>
                    
                   
                    
                    {/* Add your extra public route here */}
              <NavLink to="/aboutUs">About Us</NavLink>
           
        
        </ul>
      </div>
      <div className="login flex gap-2 items-center md:navbar-end">
        <div className="relative group">
          {user && user?.email ? (
            <div className="tooltip tooltip-bottom" data-tip={displayName}>
              <img
                src={user?.photoURL}
                className="w-10 h-10 mt-2 rounded-full cursor-pointer"
                alt="User"
              />
            </div>
          ) : (
            <img src="" alt="" />
          )}
        </div>
        {user && user?.email ? (
          <button
            onClick={logout}
            className="btn bg-green-500  hover:bg-green-600 text-white rounded-full"
          >
            Log out
          </button>
        ) : (
            <>
             <Link
            to="/auth/login"
            className="btn  bg-green-500 hover:bg-green-600 text-white rounded-full"
          >
            Login
          </Link>
          <Link to="/auth/register" className="btn  bg-green-500 hover:bg-green-600 text-white rounded-full">Register</Link>
          </>
         
          
        )}
      </div>
    </div>
    </div>
    
  );
};

export default Navbar;
