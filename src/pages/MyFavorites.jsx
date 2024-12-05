import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const MyFavorites = () => {
    const { user } = useContext(AuthContext); // Access logged-in user context
    const [favoriteMovies, setFavoriteMovies] = useState([]); // State to store favorite movies
    const [loading, setLoading] = useState(true); // Add loading state

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
            text: "This will remove all your favorite movies!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete all!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Send DELETE request with user email
                    const response = await fetch(`http://localhost:3000/favorites?email=${user.email}`, {
                        method: "DELETE",
                    });
    
                    if (response.ok) {
                        // Clear all favorite movies from state
                        setFavoriteMovies([]);
    
                        Swal.fire({
                            title: "Deleted!",
                            text: "All your favorite movies have been removed.",
                            icon: "success",
                        });
                    } else {
                        // Handle errors from the server
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
        <div className="container mx-auto p-6 my-12">
            <h1 className="text-4xl font-bold text-center mb-8">My Favorite Movies</h1>
            {loading ? ( 
                <div className="text-center">
                    <span className="loading loading-infinity loading-lg"></span>
                    </div>
            ) : favoriteMovies.length === 0 ? (
                <p className="text-center text-gray-500">No favorite movies found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteMovies.map((movie) => (
                        <div key={movie._id} className="card shadow-lg p-4 rounded-lg">
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-60 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-2xl font-semibold mb-2">{movie.title}</h2>
                            <p>Genre: {movie.genre}</p>
                            <p>Duration: {movie.duration} mins</p>
                            <p>Release Year: {movie.releaseYear}</p>
                            <p>Rating: {movie.rating}</p>
                            <p className="mt-4 text-sm">{movie.summary}</p>
                            <button
                                onClick={handleRemoveFavorites}
                                className="btn btn-error mt-4"
                            >
                                Remove from Favorites
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyFavorites;
