import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MovieDetailsPage = () => {
    const { id } = useParams(); // Extract the movie ID from the route
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch movie details from the backend using the ID
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/movies/${id}`);
                const data = await response.json();
                setMovie(data); // Set movie details
            } catch (error) {
                console.error("Error fetching movie details:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Could not load movie details.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        };

        fetchMovieDetails();
    }, [id]);

    const handleDelete = async (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:3000/movies/${_id}`, {
                        method: "DELETE",
                    });
                    const data = await response.json();

                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your movie has been deleted.",
                            icon: "success",
                        });

                        // Redirect to the AllMovies page after deletion
                        navigate("/all-movies");
                    }
                } catch (error) {
                    console.error("Error deleting movie:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the movie.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            }
        });
    };

    if (!movie) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold">Loading...</h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 my-12">
            <h1 className="text-4xl font-bold text-center mb-8">{movie.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <img src={movie.poster} alt={movie.title} className="w-full" />
                </div>
                <div>
                    <p>Genre: {movie.genre}</p>
                    <p>Duration: {movie.duration} mins</p>
                    <p>Release Year: {movie.releaseYear}</p>
                    <p>Rating: {movie.rating}</p>
                    <p className="mt-4">{movie.summary}</p>
                    <div className="mt-8">
                        <button
                            className="btn btn-error mr-4"
                            onClick={() => handleDelete(movie._id)}
                        >
                            Delete Movie
                        </button>
                        <button className="btn btn-primary">Add to Favorite</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
