import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const fakeMovies = [
    {
        poster: "https://example.com/posters/movie1.jpg",
        title: "The Eternal Quest",
        genre: ["Adventure", "Fantasy"],
        duration: 140,
        releaseYear: 2023,
        rating: 4.8,
        summary: "A group of explorers embarks on a magical journey to uncover an ancient secret that could change the world forever.",
        _id: "fake1", // Add a unique identifier for fake movies
    },
    {
        poster: "https://example.com/posters/movie2.jpg",
        title: "Shadows of the Past",
        genre: ["Mystery", "Thriller"],
        duration: 120,
        releaseYear: 2021,
        rating: 4.5,
        summary: "A detective must confront his own past while solving a string of mysterious disappearances in a small town.",
        _id: "fake2",
    },
];

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("http://localhost:3000/movies");
                const mongoMovies = await response.json();
                // Combine MongoDB movies with fake movies
                const allMovies = [...fakeMovies, ...mongoMovies];
                setMovies(allMovies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="container mx-auto p-6 my-12">
            <h1 className="text-4xl font-bold text-center mb-8">All Movies</h1>
            {loading ? (
                <div className="text-center">
                    <p>Loading movies...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllMovies;
