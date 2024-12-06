import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const MyFavorites = () => {
    const { user } = useContext(AuthContext); // Access logged-in user context
    const [favoriteMovies, setFavoriteMovies] = useState([]); // State to store favorite movies
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            if (user) {
                try {
                    const response = await fetch(`http://localhost:3000/favorites?email=${user.email}`);
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

    // Handle the removal of a movie from favorites
    const handleRemoveFavorites = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will remove your favorite movie!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:3000/favorites?email=${user.email}`, {
                        method: "DELETE",
                    });

                    if (response.ok) {
                        setFavoriteMovies([]);

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your favorite movies has been removed.",
                            icon: "success",
                        });
                    } else {
                        const errorData = await response.json();
                        Swal.fire({
                            title: "Error!",
                            text: errorData.message || "Failed to delete favorite movies.",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("Error deleting favorites:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete your favorite movies.",
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
                                    onClick={handleRemoveFavorites}
                                    className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 px-4 rounded-lg text-sm font-semibold shadow-md hover:from-pink-600 hover:to-red-500 transition-transform transform hover:scale-105"
                                >
                                    Remove from Favorites
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyFavorites;
