import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Rating } from 'react-simple-star-rating';
import { useParams } from "react-router-dom";

const UpdateMovieForm = () => {
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }, setValue,reset } = useForm();
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`http://localhost:3000/movies/${id}`);
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
    }, [id, setValue]);

    const handleStarClick = (value) => {
        setRating(value);
    };

    const onSubmit = async (data) => {
        if (rating === 0) {
            toast.error("Please provide a rating.");
            return;
        }
        data.rating = rating;

        try {
            const response = await fetch(`http://localhost:3000/movies/${id}`, {
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
            <div className="text-center">
                <p>Loading movie details...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <ToastContainer position={"top-center"}></ToastContainer>
            <h1 className="text-4xl font-bold text-center mb-8">Update Movie</h1>
            <form onSubmit={handleSubmit(onSubmit,handleValidationErrors)} className="max-w-3xl mx-auto">
                {/* Movie Poster */}
                <div className="form-control">
                    <label className="label">Movie Poster URL</label>
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
                    <label className="label">Movie Title</label>
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
                    <label className="label">Genre</label>
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
                    <label className="label">Duration (minutes)</label>
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
                    <label className="label">Release Year</label>
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
                <div className="form-control">
                    <label className="label">Rating</label>
                    <Rating
                        onClick={handleStarClick}
                        ratingValue={rating}
                        initialValue={rating}
                        size={30}
                        transition
                    />
                </div>

                {/* Summary */}
                <div className="form-control">
                    <label className="label">Summary</label>
                    <textarea
                        {...register("summary", {
                            required: "Summary is required",
                            minLength: { value: 10, message: "Summary must be at least 10 characters long" },
                        })}
                        className="textarea textarea-bordered h-24"
                    />
                   
                </div>

                <button type="submit" className="btn btn-primary mt-4">Update Movie</button>
            </form>
        </div>
    );
};

export default UpdateMovieForm;
