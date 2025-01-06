import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { Helmet } from "react-helmet";

const MyFavorites = () => {
    const { user } = useContext(AuthContext);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("table"); // Toggle between "table" and "card" view

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
                            email: user.email,
                        },
                    });

                    if (response.ok) {
                        setFavoriteMovies((prevFavorites) =>
                            prevFavorites.filter((movie) => movie.movieId !== movieId)
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
            <Helmet>
                <title>My Favorite Movies - Movies Portal</title>
            </Helmet>
            <h1 className="text-5xl font-bold text-center mb-8 mt-8">My Favorite Movies</h1>

            <div className="flex justify-end mb-4">
                <button
                    className={`mr-2 px-4 py-2 rounded-lg text-white ${
                        viewMode === "table" ? "bg-yellow-500" : "bg-gray-400"
                    }`}
                    onClick={() => setViewMode("table")}
                >
                    Table View
                </button>
                <button
                    className={`px-4 py-2 rounded-lg text-white ${
                        viewMode === "card" ? "bg-yellow-500" : "bg-gray-400"
                    }`}
                    onClick={() => setViewMode("card")}
                >
                    Card View
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <span className="loading loading-infinity loading-lg"></span>
                </div>
            ) : favoriteMovies.length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                    No favorite movies found. Start adding some!
                </p>
            ) : viewMode === "table" ? (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full bg-white rounded-lg shadow-lg overflow-hidden">
                        <thead className="bg-gradient-to-r from-[#19284a] to-[#33526d] text-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium">Poster</th>
                                <th className="px-6 py-4 text-left text-sm font-medium">Title</th>
                                <th className="px-6 py-4 text-left text-sm font-medium">Genre</th>
                                <th className="px-6 py-4 text-left text-sm font-medium">Duration</th>
                                <th className="px-6 py-4 text-left text-sm font-medium">Release Year</th>
                                <th className="px-6 py-4 text-left text-sm font-medium">Rating</th>
                                <th className="px-6 py-4 text-center text-sm font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {favoriteMovies.map((movie, index) => (
                                <tr
                                    key={movie._id}
                                    className={`${
                                        index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                                    } hover:bg-gray-200 transition-colors`}
                                >
                                    <td className="px-6 py-4">
                                        <img
                                            src={movie.poster}
                                            alt={movie.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-blue-900">
                                        {movie.title}
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{movie.genre}</td>
                                    <td className="px-6 py-4 text-gray-700">
                                        {movie.duration} mins
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{movie.releaseYear}</td>
                                    <td className="px-6 py-4 text-gray-700">{movie.rating}/5</td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleRemoveFavorite(movie.movieId)}
                                            className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm font-semibold shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {favoriteMovies.map((movie) => (
                        <div
                            key={movie._id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                        >
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-60 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-bold text-blue-900 mb-2">
                                    {movie.title}
                                </h2>
                                <p className="text-sm text-gray-700">
                                    Genre: {movie.genre}
                                </p>
                                <p className="text-sm text-gray-700">
                                    Duration: {movie.duration} mins
                                </p>
                                <p className="text-sm text-gray-700">
                                    Release Year: {movie.releaseYear}
                                </p>
                                <p className="text-sm text-gray-700">Rating: {movie.rating}/5</p>
                                <button
                                    onClick={() => handleRemoveFavorite(movie.movieId)}
                                    className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg text-sm font-semibold shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                                >
                                    Remove
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
