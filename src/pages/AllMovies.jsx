import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";


const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("http://localhost:3000/movies");
                const mongoMovies = await response.json();
                
                setMovies(mongoMovies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } 
            finally {
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
            <h1 className="text-4xl font-bold text-center mb-8">All Movies</h1>
            <div className="form-control mb-8">
                <input
                    type="text"
                    placeholder="Search movies..."
                    className="input input-bordered"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {loading ? ( 
                <div className="text-center">
                    <span className="loading loading-infinity loading-lg"></span>
                </div>
            ) : (
           
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMovies.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllMovies;
