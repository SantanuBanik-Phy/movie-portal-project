// src/components/MovieCard.jsx
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={movie.poster} alt={movie.title} /></figure>
            <div className="card-body">
                <h2 className="card-title">{movie.title}</h2>
                <div className="badge badge-secondary mr-2">{movie.genre.join(', ')}</div>
                <p>Duration: {movie.duration} mins</p>
                <p>Release Year: {movie.releaseYear}</p>
                <p>Rating: {movie.rating}</p>
                <div className="card-actions justify-end">
                    <Link to={`/movie-details/${movie.id}`} className="btn btn-primary">See Details</Link> {/* Assuming you'll add an ID to your movie data */}
                </div>
            </div>
        </div>
    );
};

export default MovieCard;