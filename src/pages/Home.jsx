import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard";



const Home = () => {
  const movies = useLoaderData()
   
    const [loadedMovies, setLoadedMovies] = useState(movies);
   

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("http://localhost:3000/movies"); // Fetch MongoDB movies
                const mongoMovies = await response.json();

               

                // Sort movies by rating (descending) and take the top 6
                const featuredMovies = mongoMovies.sort((a, b) => b.rating - a.rating).slice(0, 6);

                setLoadedMovies(featuredMovies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } 
        };

        fetchMovies();
    }, []);

    return (
        <div>
            <Banner />
            {/* Featured Movies Section */}
            <div className="container mx-auto p-6 my-12">
                <h2 className="text-3xl font-bold text-center mb-8">Featured Movies</h2>
               
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loadedMovies.map((movie) => (
                            <MovieCard key={movie._id} movie={movie}  />
                        ))}
                    </div>
                
                <div className="text-center mt-8">
                    <Link to="/all-movies" className="btn btn-primary">
                        See All Movies
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
