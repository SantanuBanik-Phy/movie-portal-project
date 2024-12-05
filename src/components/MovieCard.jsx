import { Link } from "react-router-dom";

const MovieCard = ({ movie, isDarkMode }) => {
    const textColorClass = isDarkMode ? "text-white" : "text-black";

    return (
        <div className={`card bg-base-100 shadow-xl ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <figure>
                <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover" />
            </figure>
            <div className={`card-body ${textColorClass}`}>
                <h2 className={`card-title ${textColorClass}`}>{movie.title}</h2>
                <div className={`badge badge-secondary mr-2 ${textColorClass}`}>{movie.genre}</div>
                <p className={textColorClass}>Duration: {movie.duration} mins</p>
                <p className={textColorClass}>Release Year: {movie.releaseYear}</p>
                <p className={textColorClass}>Rating: {movie.rating}</p>
                <div className="card-actions justify-end">
                    <Link
                        to={`/movie-details/${movie._id}`}
                        className={`btn btn-primary ${isDarkMode ? "btn-outline" : ""}`}
                    >
                        See Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
