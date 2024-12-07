import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { Helmet } from "react-helmet";

const MyFavorites = () => {
    const { user } = useContext(AuthContext); 
    const [favoriteMovies, setFavoriteMovies] = useState([]); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            if (user) {
                try {
                    const response = await fetch(`https://b10-a10-server-site.vercel.app/favorites?email=${user.email}`);
                    const data = await response.json();
                    setFavoriteMovies(data);
                } catch (error) {
                    console.error("Error fetching favorite movies:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchFavoriteMovies();
    }, [user]);

    // Handle the removal of a specific movie from favorites
    const handleRemoveFavorite = async (movieId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will remove the selected movie from your favorites.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`https://b10-a10-server-site.vercel.app/favorites/${movieId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            email: user.email, // Pass the user's email to verify ownership
                        },
                    });

                    if (response.ok) {
                        // Filter out the deleted movie from the local state
                        setFavoriteMovies((prevFavorites) =>
                            prevFavorites.filter((movie) => movie._id !== movieId)
                        );

                        Swal.fire({
                            title: "Removed!",
                            text: "The movie has been removed from your favorites.",
                            icon: "success",
                        });
                    } else {
                        const errorData = await response.json();
                        Swal.fire({
                            title: "Error!",
                            text: errorData.message || "Failed to remove the movie from favorites.",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("Error removing favorite movie:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to remove the movie. Please try again.",
                        icon: "error",
                    });
                }
            }
        });
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-5xl font-bold text-center mb-8 mt-8">
                My Favorite Movies
            </h1>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-infinity loading-lg"></span>
                </div>
            ) : favoriteMovies.length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                    No favorite movies found. Start adding some!
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favoriteMovies.map((movie) => (
                        <div
                            key={movie._id}
                            className="group bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                        >
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                                    {movie.title}
                                </h2>
                                <div className="text-sm text-gray-500 mb-4">
                                    <p><strong>Genre:</strong> {movie.genre}</p>
                                    <p><strong>Duration:</strong> {movie.duration} mins</p>
                                    <p><strong>Release Year:</strong> {movie.releaseYear}</p>
                                    <p><strong>Rating:</strong> {movie.rating}/5</p>
                                </div>
                                <p className="text-gray-700 text-sm mb-4">
                                    {movie.summary.length > 100
                                        ? `${movie.summary.substring(0, 100)}...`
                                        : movie.summary}
                                </p>
                                <button
                                    onClick={() => handleRemoveFavorite(movie._id)}
                                    className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 px-4 rounded-lg text-sm font-semibold shadow-md hover:from-pink-600 hover:to-red-500 transition-transform transform hover:scale-105"
                                >
                                    Remove from Favorites
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Helmet>
                <title>My Favorite Movies - Movies Portal</title>
            </Helmet>
        </div>
    );
};

export default MyFavorites;
