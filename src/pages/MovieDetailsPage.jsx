import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { Helmet } from "react-helmet";

const MovieDetailsPage = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://b10-a10-server-site.vercel.app/movies/${id}`);
                const data = await response.json();
                setMovie(data);

                if (user) {
                    const favoritesResponse = await fetch(`https://b10-a10-server-site.vercel.app/favorites?email=${user.email}&movieId=${id}`);
                    const favoritesData = await favoritesResponse.json();
                    setIsFavorite(favoritesData.length > 0);
                }
            } catch (error) {
                console.error("Error fetching movie details:", error);
                Swal.fire({
                    title: "Error!",
                    text: "Could not load movie details.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id, user]);

    const handleDelete = async (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e3342f",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`https://b10-a10-server-site.vercel.app/movies/${_id}`, { method: "DELETE" });
                    const data = await response.json();

                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The movie has been successfully deleted.",
                            icon: "success",
                        });
                        navigate("/all-movies");
                    }
                } catch (error) {
                    console.error("Error deleting movie:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the movie. Please try again.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            }
        });
    };

    const handleAddToFavorites = async () => {
        if (isFavorite) {
            Swal.fire({
                title: "Info!",
                text: "This movie is already in your favorites.",
                icon: "info",
                confirmButtonText: "OK",
            });
            return;
        }

        try {
            const response = await fetch("https://b10-a10-server-site.vercel.app/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...movie, userEmail: user.email }),
            });

            if (response.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "Movie added to favorites!",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                setIsFavorite(true);
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to add the movie to favorites.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error("Error adding to favorites:", error);
            Swal.fire({
                title: "Error!",
                text: "An error occurred. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-infinity loading-lg"></span>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="text-center mt-12">
                <h2 className="text-2xl font-bold">No Movie Found</h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 mt-40  my-12">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">{movie.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Poster */}
                <div className="overflow-hidden rounded-lg shadow-lg">
                    <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
                </div>

                {/* Movie Details */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                    <p className="mb-2"><strong>Genre:</strong> <span className="badge bg-green-200 text-green-800">{movie.genre}</span></p>
                    <p className="mb-2"><strong>Duration:</strong> {movie.duration} mins</p>
                    <p className="mb-2"><strong>Release Year:</strong> {movie.releaseYear}</p>
                    <p className="mb-2"><strong>Rating:</strong> {movie.rating}</p>
                    <p className="mt-4 text-gray-600">{movie.summary}</p>

                    {/* Action Buttons */}
                    <div className="mt-6 space-y-3">
                        <button
                            className="w-full py-2 px-4 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-200"
                            onClick={() => handleDelete(movie._id)}
                        >
                            Delete Movie
                        </button>
                        <button
                            className={`w-full py-2 px-4 rounded-lg shadow-md transition duration-200 ${
                                isFavorite ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
                            }`}
                            onClick={handleAddToFavorites}
                            disabled={isFavorite}
                        >
                            {isFavorite ? "Already in Favorites" : "Add to Favorites"}
                        </button>
                        <Link
                            to={`/update-movie/${movie._id}`}
                            className="block w-full py-2 px-4 bg-gradient-to-r from-[#19284a] to-[#619bca] text-white text-center rounded-lg shadow-md hover:from-blue-600 hover:to-green-500 transition duration-200"
                        >
                            Update Movie
                        </Link>
                    </div>
                </div>
            </div>
            <Helmet>
                <title>{movie.title} | Movie Details</title>
                
   
         </Helmet>
        </div>
    );
};

export default MovieDetailsPage;
