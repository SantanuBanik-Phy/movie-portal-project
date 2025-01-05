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
    <div
      className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-gradient-to-r from-indigo-50 to-indigo-100 p-4"
      style={{ backgroundImage: "url('https://i.ibb.co.com/27DNzh7/eb5cdea5-5f61-4c62-b4a4-0b8d92f292bf.webp')" }}
    >
      <ToastContainer position="top-center" />

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 relative z-10">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Welcome Back!</h1>
        <p className="text-center text-gray-600 mb-8">
          Log in to your account to explore amazing features.
        </p>

        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-indigo-300"
                required
              />
            </div>
            {error.signIn && (
              <p className="text-red-500 text-sm mt-2">
                {error.signIn.replace("auth/", "").replace("-", " ")}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600" />
              <span className="ml-2">Remember me</span>
            </label>
            <Link
              to="/auth/forgot-password"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:to-yellow-400 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Log In
          </button>

          <div className="my-6 text-center text-gray-500">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-gray-100 py-3 rounded-lg shadow hover:bg-gray-200 transition duration-300"
          >
            <img src={google} className="w-5 h-5 mr-3" alt="Google logo" />
            Continue with Google
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don&apos;t have an account?{' '}
          <Link
            to="/auth/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

      <Helmet>
        <title>Login - Movie Portal</title>
      </Helmet>
    </div>
  );
};

export default Login;
