import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import google from "../assets/google.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const Login = () => {
  const { login, googleSignIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError({ ...error, signIn: err.code });
        toast.error(`Login failed: ${err.message}`);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);
        toast.success("Successfully signed in with Google!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError({ ...error, signIn: err.code });
        toast.error(`Google Sign-In failed: ${err.message}`);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
      <ToastContainer position="top-center" />
      <div className="flex flex-col justify-center items-center py-12">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-700 dark:text-white">
            Welcome Back!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Log in to your account to access amazing features.
          </p>
        </div>
        <div className="card w-full rounded-xl max-w-xl shadow-xl bg-white dark:bg-gray-800  p-10">
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold text-gray-600 dark:text-gray-300">Email</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered pl-12 w-full dark:bg-gray-700 dark:text-gray-200"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="absolute left-3 top-3.5 text-gray-400">
                  {/* Email SVG */}
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
                      d="M16.5 12.75L12 16.5m0 0L7.5 12.75m4.5 3.75V6.75M3.75 5.25h16.5A2.25 2.25 0 0122.5 7.5v9a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 16.5v-9A2.25 2.25 0 013.75 5.25z"
                    />
                  </svg>
                </span>
              </div>
            </div>

           
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold text-gray-600 dark:text-gray-300">Password</span>
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
                      d="M15.75 9a6.75 6.75 0 11-13.5 0 6.75 6.75 0 0113.5 0zM12 12l7.5 7.5m-1.5-6h-2.25"
                    />
                  </svg>
                </span>
              </div>
              {error.signIn && (
                <p className="text-red-600 text-sm mt-2">
                  {error.signIn.replace("auth/", "").replace("-", " ")}
                </p>
              )}
              <label className="label">
                <Link
                  to="/auth/login"
                  className="label-text-alt text-sm link link-hover underline font-semibold text-blue-500 dark:text-blue-300"
                  state={{ email: email }}
                >
                  Forgot password?
                </Link>
              </label>
            </div>

       
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold hover:from-yellow-500 hover:to-yellow-700"
              >
                Log In
              </button>
            </div>

        
            <div className="divider my-6">OR</div>

            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full flex justify-center items-center space-x-2"
            >
              <img src={google} className="w-6 h-6" alt="Google logo" />
              <span>Continue with Google</span>
            </button>

     
            <div className="text-center mt-4">
              <p>
                Don't have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-blue-600 font-bold hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Helmet>
        <title>Login - Movie Portal</title>
      </Helmet>
    </div>
  );
};

export default Login;
