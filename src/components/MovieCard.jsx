import { Link } from "react-router-dom";

const MovieCard = ({ movie, isDarkMode }) => {
    const cardBgClass = isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800";
    const hoverEffectClass = isDarkMode
        ? "hover:shadow-gray-700"
        : "hover:shadow-gray-300";

    return (
        <div
            className={`card shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl ${hoverEffectClass} ${cardBgClass} rounded-lg overflow-hidden`}
        >
            <figure className="relative">
                <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-48 object-cover transition-transform transform hover:scale-105"
                />
                <div className="absolute top-2 left-2 px-3 py-1 bg-black bg-opacity-50 text-white text-sm font-semibold rounded">
                    {movie.genre}
                </div>
            </figure>
            <div className="p-4">
                <h2 className="text-lg font-bold mb-2 truncate">{movie.title}</h2>
                <p className="text-sm mb-1">
                    <span className="font-semibold">Duration:</span> {movie.duration} mins
                </p>
                <p className="text-sm mb-1">
                    <span className="font-semibold">Release Year:</span> {movie.releaseYear}
                </p>
                <p className="text-sm mb-3">
                    <span className="font-semibold">Rating:</span> {movie.rating}
                </p>
                <div className="text-right">
                    <Link
                        to={`/movie-details/${movie._id}`}
                        className="inline-block px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition-colors"
                    >
                        See Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
