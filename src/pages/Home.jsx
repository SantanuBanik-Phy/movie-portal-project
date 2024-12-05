import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const movies = useLoaderData();
  const [loading, setLoading] = useState(true);
  const [loadedMovies, setLoadedMovies] = useState(movies);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
      }finally {
        setLoading(false); 
    }
    };

    fetchMovies();
  }, []);

  // Toggle Theme
  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode); // Add/remove 'dark' class
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen transition-colors">
        {/* Theme Toggle Button */}
        <div className=" py-1 pr-6 flex justify-end items-center">
          <button
            onClick={handleThemeToggle}
            className="btn   btn-outline dark:btn-primary"
          >
            {isDarkMode ? <i className="fa-solid fa-sun text-2xl text-white"></i> : <i className="fa-solid fa-moon text-3xl"></i>}
          </button>
        </div>

        {loading ? ( 
                    <div className="text-center">
                     <span className="loading loading-infinity loading-lg"></span>  
                    </div>
                ) : (
       <>
        <Banner />
        
        {/* Featured Movies Section */}
        <div className="container mx-auto p-6 my-12">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadedMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} isDarkMode={isDarkMode} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/all-movies" className="btn btn-primary">
              See All Movies
            </Link>
          </div>
        </div>
        </>
                )}
      </div>
    </div>
  );
};

export default Home;
