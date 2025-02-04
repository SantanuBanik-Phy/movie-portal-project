import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Rating } from "react-simple-star-rating";
import { useParams, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { AuthContext } from "../provider/AuthProvider";

const UpdateMovieForm = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !user.email) {
            toast.error("Unauthorized! Please log in to update a movie.");
            navigate("/auth/login");
            return;
        }

        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://b10-a10-server-site.vercel.app/movies/${id}`);
                const movieData = await response.json();

                // Set default values for the form fields
                setValue("poster", movieData.poster);
                setValue("title", movieData.title);
                setValue("genre", movieData.genre);
                setValue("duration", movieData.duration);
                setValue("releaseYear", movieData.releaseYear);
                setRating(movieData.rating);
                setValue("summary", movieData.summary);
            } catch (error) {
                console.error("Error fetching movie details:", error);
                toast.error("Failed to fetch movie details.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id, setValue, user, navigate]);

    const handleStarClick = (value) => {
        setRating(value);
    };

    const onSubmit = async (data) => {
        if (!user || !user.email) {
            toast.error("Unauthorized! Please log in to update a movie.");
            return;
        }

        if (rating === 0) {
            toast.error("Please provide a rating.");
            return;
        }
        data.rating = rating;

        try {
            const response = await fetch(`https://b10-a10-server-site.vercel.app/movies/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Movie updated successfully!");
                reset();
                setRating(0);
             
            } else {
                toast.error("Failed to update movie.");
            }
        } catch (error) {
            console.error("Error updating movie:", error);
            toast.error("Failed to update movie.");
        }
    };

    const handleValidationErrors = () => {
        Object.keys(errors).forEach((key) => {
            toast.error(errors[key].message);
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <ToastContainer position="top-center" />
            <h1 className="text-4xl font-bold text-center mb-8 mt-8 ">
                Update Movie
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit, handleValidationErrors)}
                className="bg-white shadow-lg rounded-lg p-8 space-y-6"
            >
                {/* Movie Poster */}
                <div>
                    <label className="block font-medium text-gray-700 mb-2">
                        Movie Poster URL
                    </label>
                    <input
                        type="text"
                        {...register("poster", {
                            required: "Movie poster URL is required",
                            pattern: {
                                value: /^(http|https):\/\/[^ "]+$/,
                                message: "Invalid URL",
                            },
                        })}
                        className="w-full input input-bordered focus:ring-2 focus:ring-blue-900 focus:outline-none"
                    />
                </div>

                {/* Movie Title */}
                <div>
                    <label className="block font-medium text-gray-700 mb-2">
                        Movie Title
                    </label>
                    <input
                        type="text"
                        {...register("title", {
                            required: "Movie title is required",
                            minLength: {
                                value: 2,
                                message: "Title must be at least 2 characters long",
                            },
                        })}
                        className="w-full input input-bordered focus:ring-2 focus:ring-blue-900 focus:outline-none"
                    />
                </div>

                {/* Genre */}
                <div>
                    <label className="block font-medium text-gray-700 mb-2">
                        Genre
                    </label>
                    <select
                        {...register("genre", { required: "Please select a genre" })}
                        className="w-full select select-bordered focus:ring-2 focus:ring-blue-900 focus:outline-none"
                    >
                        <option value="">Select Genre</option>
                        <option value="comedy">Comedy</option>
                        <option value="drama">Drama</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="action">Action</option>
                        <option value="history">History</option>
                        <option value="science fiction">Science Fiction</option>
                        <option value="animation">Animation</option>
                    </select>
                </div>

                {/* Duration */}
                <div>
                    <label className="block font-medium text-gray-700 mb-2">
                        Duration (minutes)
                    </label>
                    <input
                        type="number"
                        {...register("duration", {
                            required: "Duration is required",
                            min: { value: 60, message: "Duration must be at least 60 minutes" },
                        })}
                        className="w-full input input-bordered focus:ring-2 focus:ring-blue-900 focus:outline-none"
                    />
                </div>

                {/* Release Year */}
                <div>
                    <label className="block font-medium text-gray-700 mb-2">
                        Release Year
                    </label>
                    <select
                        {...register("releaseYear", { required: "Please select a release year" })}
                        className="w-full select select-bordered focus:ring-2 focus:ring-blue-900 focus:outline-none"
                    >
                        <option value="">Select Year</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                    </select>
                </div>

                {/* Rating */}
                <div>
                    <label className="block font-medium text-gray-700 mb-2">
                        Rating
                    </label>
                    <Rating
                        onClick={handleStarClick}
                        ratingValue={rating}
                        initialValue={rating}
                        size={30}
                        allowFraction={true}
                        SVGstyle={{ display: 'inline' }}
                    />
                </div>

                {/* Summary */}
                <div>
                    <label className="block font-medium text-gray-700 mb-2">
                        Summary
                    </label>
                    <textarea
                        {...register("summary", {
                            required: "Summary is required",
                            minLength: { value: 10, message: "Summary must be at least 10 characters long" },
                        })}
                        className="w-full textarea textarea-bordered h-24 focus:ring-2 focus:ring-blue-900 focus:outline-none"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-[#19284a] to-[#619bca] text-white font-bold rounded-lg shadow-lg hover:from-teal-500 hover:to-green-600 transition-transform transform hover:scale-105"
                    >
                        Update Movie
                    </button>
                </div>
            </form>
            <Helmet>
                <title>Update Movie - Movie Portal</title>
            </Helmet>
        </div>
    );
};

export default UpdateMovieForm;
