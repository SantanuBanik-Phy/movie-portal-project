import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import google from "../assets/google.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <div className="min-h-screen bg-base-200">
        <ToastContainer position="top-center" ></ToastContainer>
      <div className="flex flex-col justify-center items-center ">
        <div className="text-center mt-10 mb-10">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card w-full max-w-xl shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              {error.signIn && (
                <p className="text-red-600">
                  {error.signIn.replace("auth/", "").replace("-", " ")}
                </p>
              )}
              <label className="label">
                <Link
                  to="/forgetPassword"
                  className="label-text-alt text-sm link link-hover underline font-semibold "
                  state={{ email: email }}
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn bg-green-500">
                Login
              </button>
            </div>
            <div className="divider">OR</div>
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline btn-accent"
            >
              <img src={google} className="w-5 h-5" alt="" />
              Continue with Google
            </button>
            <label className="label">
              <p className="text-center mt-4">
                Do not have an account?{" "}
                <Link className="text-blue-600 font-bold" to="/auth/register">
                  Register
                </Link>
              </p>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
