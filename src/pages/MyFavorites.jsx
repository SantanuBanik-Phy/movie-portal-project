import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const MyFavorites = () => {
    const { user } = useContext(AuthContext);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            if (user) {
                try {
                    const response = await fetch(`http://localhost:3000/favorites?email=${user.email}`);
                    const data = await response.json();
                    setFavoriteMovies(data);
                } catch (error) {
                    console.error("Error fetching favorite movies:", error);
                }
            }
        };

        fetchFavoriteMovies();
    }, [user]);

    const handleRemoveFavorite = async (movieId) => {
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
                    // Include the movie ID and user's email in the DELETE request
                    const response = await fetch(`http://localhost:3000/favorites/${movieId}?email=${user.email}`, {
                        method: "DELETE",
                    });

                    if (response.ok) {
                        // Update the local state to remove the deleted movie
                        setFavoriteMovies((prevMovies) =>
                            prevMovies.filter((movie) => movie._id !== movieId)
                        );

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your movie has been removed from favorites.",
                            icon: "success",
                        });
                    } else {
                        // Handle non-successful response (e.g., 404 Not Found)
                        const errorData = await response.json(); // Parse error response
                        Swal.fire({
                            title: "Error!",
                            text: errorData.message || "Failed to delete the movie.", // Use error message from response
                            icon: "error",
                            confirmButtonText: "OK",
                        });
                    }
                } catch (error) {
                    console.error("Error deleting favorite:", error);
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
    return (
        <div className="container mx-auto p-6 my-12">
            <h1 className="text-4xl font-bold text-center mb-8">My Favorite Movies</h1>
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
                            onClick={() => handleRemoveFavorite(movie._id)}
                            className="btn btn-error mt-4"
                        >
                            Remove from Favorites
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyFavorites;
