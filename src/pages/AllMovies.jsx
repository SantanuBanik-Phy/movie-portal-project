import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { Helmet } from "react-helmet";

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("https://b10-a10-server-site.vercel.app/movies");
                const mongoMovies = await response.json();
                setMovies(mongoMovies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    // Filter movies based on search term
    const filteredMovies = movies.filter((movie) => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="container mx-auto p-6 my-12">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">All Movies</h1>

            {/* Search Input */}
            <div className="relative mb-8 max-w-lg mx-auto">
                <input
                    type="text"
                    placeholder="Search movies..."
                    className="w-full px-12 py-3 rounded-lg shadow-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35m1.5-6.65a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            {/* Movies Grid */}
            {loading ? (
                <div className="flex justify-center items-center min-h-[50vh]">
                    <span className="loading loading-infinity loading-lg"></span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredMovies.length > 0 ? (
                        filteredMovies.map((movie) => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 text-xl col-span-full">
                            No movies found matching your search.
                        </p>
                    )}
                </div>
            )}
             <Helmet>
            <title>All Movies | Movie Portal</title>
         </Helmet>
        </div>
    );
};

export default AllMovies;
