import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddMovieForm = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [rating, setRating] = useState(0);

    const handleStarClick = (value) => {
        setRating(value);
    };

    const onSubmit = async (data) => {
        const hasValidationErrors = Object.keys(errors).length > 0;

        if (hasValidationErrors) {
            handleValidationErrors(); 
            return;
        }

        if (rating === 0) {
            toast.error("Please provide a rating.");
            return;
        }

        // Add user email and rating to the data
        data.userEmail = user.email;
        data.rating = rating;

        try {
            const response = await fetch("http://localhost:3000/movies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "Movie added successfully.",
                    icon: "success",
                    confirmButtonText: "Ok",
                });

                // Reset the form and the rating immediately
                setRating(0); // Reset rating before resetting form
                reset(); // Reset form fields
            } else {
                toast.error("Failed to add the movie. Please try again.");
            }
        } catch (error) {
            console.error("Error adding movie:", error);
            toast.error("Failed to add the movie. Please try again.");
        }
    };

    const handleValidationErrors = () => {
        Object.keys(errors).forEach((key) => {
            toast.error(errors[key].message);
        });
    };

    // Ensure rating resets when form is reset
    useEffect(() => {
        setRating(0); // Reset rating when form is reset
    }, [reset]);

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <ToastContainer position="top-center" />
            <h1 className="text-4xl font-bold text-center mb-8 mt-8 ">
                Add New Movie
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
                        className="w-full input input-bordered focus:ring-2 focus:ring-teal-500 focus:outline-none"
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
                        className="w-full input input-bordered focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                </div>

                {/* Genre */}
                <div>
                    <label className="block font-medium text-gray-700 mb-2">
                        Genre
                    </label>
                    <select
                        {...register("genre", { required: "Please select a genre" })}
                        className="w-full select select-bordered focus:ring-2 focus:ring-teal-500 focus:outline-none"
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
                        className="w-full input input-bordered focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                </div>

                {/* Release Year */}
                <div>
                    <label className="block font-medium text-gray-700 mb-2">
                        Release Year
                    </label>
                    <select
                        {...register("releaseYear", { required: "Please select a release year" })}
                        className="w-full select select-bordered focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                        <option value="">Select Year</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
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
                        initialValue={0}
                        size={30}
                        transition={true}
                        className="flex justify-start"
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
                        className="w-full textarea textarea-bordered h-24 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-teal-400 to-green-500 text-white font-bold rounded-lg shadow-lg hover:from-teal-500 hover:to-green-600 transition-transform transform hover:scale-105"
                    >
                        Add Movie
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMovieForm;
