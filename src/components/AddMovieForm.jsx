import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import StarRating, { Rating } from "react-simple-star-rating";
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

    const onSubmit = (data) => {
        if (rating === 0) {
            toast.error("Please provide a rating.");
            return;
        }

        data.userEmail = user.email;
        data.rating = rating;

        fetch("http://localhost:3000/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Movie added successfully.",
                        icon: "success",
                        confirmButtonText: "Ok",
                    });
                    reset();
                    setRating(0);
                }
            })
            .catch((error) => {
                toast.error("Failed to add the movie. Please try again.");
                console.error("Error:", error);
            });
    };

    const handleValidationErrors = () => {
        Object.keys(errors).forEach((key) => {
            toast.error(errors[key].message);
        });
    };

    return (
        <div className="container mx-auto p-6">
            <ToastContainer position="top-center" />
            <h1 className="text-4xl font-bold text-center mb-8">Add New Movie</h1>
            <form
                onSubmit={handleSubmit(onSubmit, handleValidationErrors)}
                className="max-w-3xl mx-auto"
            >
                {/* Movie Poster */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Movie Poster URL</span>
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
                        className="input input-bordered"
                    />
                </div>

                {/* Movie Title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Movie Title</span>
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
                        className="input input-bordered"
                    />
                </div>

                {/* Genre */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Genre</span>
                    </label>
                    <select
                        {...register("genre", { required: "Please select a genre" })}
                        className="select select-bordered"
                    >
                        <option value="">Select Genre</option>
                        <option value="comedy">Comedy</option>
                        <option value="drama">Drama</option>
                        <option value="horror">Horror</option>
                    </select>
                </div>

                {/* Duration */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Duration (minutes)</span>
                    </label>
                    <input
                        type="number"
                        {...register("duration", {
                            required: "Duration is required",
                            min: { value: 60, message: "Duration must be at least 60 minutes" },
                        })}
                        className="input input-bordered"
                    />
                </div>

                {/* Release Year */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Release Year</span>
                    </label>
                    <select
                        {...register("releaseYear", { required: "Please select a release year" })}
                        className="select select-bordered"
                    >
                        <option value="">Select Year</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                    </select>
                </div>

                {/* Rating */}
                <div className="form-control ">
                    <label className="label">
                        <span className="label-text">Rating</span>
                    </label>
                    <div className="flex items-center justify-start">
                        <Rating
                            onClick={handleStarClick}
                            ratingValue={rating}
                            initialValue={0}
                            size={30}
                            transition={true}
                        />
                    </div>
                </div>

                {/* Summary */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Summary</span>
                    </label>
                    <textarea
                        {...register("summary", {
                            required: "Summary is required",
                            minLength: { value: 10, message: "Summary must be at least 10 characters long" },
                        })}
                        className="textarea textarea-bordered h-24"
                    />
                </div>

                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary">
                        Add Movie
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMovieForm;
