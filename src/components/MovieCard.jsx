import { Link } from "react-router-dom";

const MovieCard = ({ movie, isDarkMode }) => {
    const textColorClass = isDarkMode ? "text-white" : "text-black";

    return (
        <div className={`card bg-base-100 shadow-xl ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
            <figure>
                <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover" />
            </figure>
            <div className={`card-body ${textColorClass}`}>
                <h2 className={`card-title font-bold ${textColorClass}`}>{movie.title}</h2>
                <div className={`badge  bg-gradient-to-r from-[#0B98AC] to-[#A8EB12] mr-2 font-semibold`}>{movie.genre}</div>
                <p className={textColorClass}> <span className="font-semibold">Duration:</span> {movie.duration} mins</p>
                <p className={textColorClass}> <span className="font-semibold">Release Year:</span> {movie.releaseYear}</p>
                <p className={textColorClass}><span className="font-semibold">Rating:</span> {movie.rating}</p>
                <div className="card-actions justify-end">
                    <Link
                        to={`/movie-details/${movie._id}`}
                        className={`btn font-semibold text-white bg-gradient-to-l from-[#0B98AC] to-[#8ec90d] rounded-xl ${isDarkMode ? "btn-outline" : ""}`}
                    >
                        See Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
