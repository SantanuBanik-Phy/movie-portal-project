import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import google from "../assets/google.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import Lottie from "react-lottie-player";
import registerAnimation from "../assets/register-animation.json"; // Add your Lottie JSON file here

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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex items-center justify-center p-4">
      <ToastContainer position="top-center" />
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Lottie Animation */}
        <div className="w-full lg:w-1/2 flex justify-center items-center bg-blue-100 p-6">
          <Lottie
            loop
            animationData={registerAnimation}
            play
            className="w-full h-auto max-w-md"
          />
        </div>

        {/* Registration Form */}
        <div className="w-full lg:w-1/2 p-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800">Register Now!</h1>
            <p className="text-gray-600 mt-2">
              Create an account to explore our amazing features.
            </p>
          </div>

          <form onSubmit={handleRegister}>
            {/* Name Field */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            {/* Photo URL Field */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">Photo URL</label>
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-gray-600 font-semibold mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-400 transition duration-300"
            >
              Register
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
            Already have an account?{' '}
            <Link
              to="/auth/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      <Helmet>
        <title>Register - Movie Portal</title>
      </Helmet>
    </div>
  );
};

export default Register;
