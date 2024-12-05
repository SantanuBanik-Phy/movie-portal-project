
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Oops!</h1>
                    <p className="py-6">The page you are looking for could not be found.</p>
                    <Link to="/" className="btn bg-green-500">Go Back Home</Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;