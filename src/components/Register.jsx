import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import google from "../assets/google.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const Register = () => {
  const { createUser, googleSignIn, setUser, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // Password validation
    if (!/(?=.*[A-Z])/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return;
    } else if (!/(?=.*[a-z])/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      return;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }
    setPasswordError("");
    setEmailError(""); 

    try {
      const result = await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL: photo });
      setUser(result.user);

      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error(error);

      // Firebase error handling
      if (error.code === "auth/email-already-in-use") {
        setEmailError("This email is already in use.");
        toast.error("This email is already in use.");
      } else if (error.code === "auth/invalid-email") {
        setEmailError("Invalid email address.");
        toast.error("Invalid email address.");
      } else {
        toast.error(`Registration failed: ${error.message}`);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      setUser(result.user);

      // Success toast
      toast.success("Successfully signed in with Google!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(`Google Sign-In failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
      <ToastContainer position="top-center" />
      <div className="w-full max-w-2xl px-6 m-12 ">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200">
            Register Now!
          </h1>
        </div>
        <div className="card bg-white dark:bg-gray-800 shadow-xl rounded-xl">
          <form onSubmit={handleRegister} className="card-body">
            {/* Name Field */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-bold text-gray-600 dark:text-gray-300">
                  Name
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="input input-bordered pl-12 w-full dark:bg-gray-700 dark:text-gray-200"
                  required
                />
                <span className="absolute left-3 top-3.5 text-gray-400">
             
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 7.5A3.75 3.75 0 1112 3.75 3.75 3.75 0 0115.75 7.5zM6.75 18a8.25 8.25 0 0113.5 0"
                    />
                  </svg>
                </span>
              </div>
            </div>

         
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-bold text-gray-600 dark:text-gray-300">
                  Email
                </span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered pl-12 w-full dark:bg-gray-700 dark:text-gray-200"
                  required
                />
                <span className="absolute left-3 top-3.5 text-gray-400">
              
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75v10.5a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V6.75m-19.5 0l9.75 6.75m-9.75-6.75l9.75 6.75m0 0l9.75-6.75"
                    />
                  </svg>
                </span>
              </div>
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

          
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-bold text-gray-600 dark:text-gray-300">
                  Photo URL
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="photo"
                  placeholder="Photo URL"
                  className="input input-bordered pl-12 w-full dark:bg-gray-700 dark:text-gray-200"
                  required
                />
                <span className="absolute left-3 top-3.5 text-gray-400">
               
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15l3-3.75 3.75 4.5h5.25m-19.5 0h10.5M2.25 6.75v10.5a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V6.75M12 11.25l3 3.75"
                    />
                  </svg>
                </span>
              </div>
            </div>

          
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-bold text-gray-600 dark:text-gray-300">
                  Password
                </span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered pl-12 w-full dark:bg-gray-700 dark:text-gray-200"
                  required
                />
                <span className="absolute left-3 top-3.5 text-gray-400">
              
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 11.25a4.5 4.5 0 004.5-4.5V6a4.5 4.5 0 00-9 0v.75a4.5 4.5 0 004.5 4.5zM9.75 15H12v3.75h2.25M12 15v-3"
                    />
                  </svg>
                </span>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-400"
              >
                Register
              </button>
            </div>
            <div className="divider">OR</div>
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline flex items-center justify-center"
            >
              <img src={google} className="w-5 h-5 mr-2" alt="Google" />
              Continue with Google
            </button>
            <label className="label">
              <p className="text-center mt-4">
                Already have an account?{" "}
                <Link className="text-blue-600 font-bold" to="/auth/login">
                  Log in
                </Link>
              </p>
            </label>
          </form>
        </div>
      </div>
      <Helmet>
        <title>Register - Movie Portal</title>
      </Helmet>
    </div>
  );
};

export default Register;
