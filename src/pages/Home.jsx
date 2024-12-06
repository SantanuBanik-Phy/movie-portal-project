import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard";
import UpcomingMovies from "../components/UpcomingMovies";
import MovieNews from "../components/MovieNews";
import { Helmet } from "react-helmet";

const Home = () => {
  const movies = useLoaderData() || []; // Ensure useLoaderData defaults to an array
  const [loading, setLoading] = useState(true);
  const [loadedMovies, setLoadedMovies] = useState(movies);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://b10-a10-server-site.vercel.app/movies");
        const mongoMovies = await response.json();

        // Validate if the response is an array
        if (Array.isArray(mongoMovies)) {
          // Sort movies by rating (descending) and take the top 6
          const featuredMovies = mongoMovies.sort((a, b) => b.rating - a.rating).slice(0, 6);
          setLoadedMovies(featuredMovies);
        } else {
          console.error("Fetched data is not an array:", mongoMovies);
          setLoadedMovies([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoadedMovies([]); // Handle errors gracefully
      } finally {
        setLoading(false); // Ensure loading state is updated
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
        <div className="py-1 pr-6 flex justify-end items-center">
          <button onClick={handleThemeToggle} className="btn btn-outline">
            {isDarkMode ? (
              <i className="fa-solid fa-sun text-2xl text-white"></i>
            ) : (
              <i className="fa-solid fa-moon text-3xl"></i>
            )}
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
              <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 text-center mb-8">
                Featured Movies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loadedMovies.length > 0 ? (
                  loadedMovies.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} isDarkMode={isDarkMode} />
                  ))
                ) : (
                  <div className="text-center text-gray-500 col-span-full">
                    No featured movies available at the moment.
                  </div>
                )}
              </div>
              <div className="text-center mt-8">
                <Link
                  to="/all-movies"
                  className="btn font-semibold text-white bg-gradient-to-r from-[#19284a] to-[#619bca] rounded-xl"
                >
                  See All Movies
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Upcoming Movies Section */}
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold ml-24 text-yellow-500">Upcoming Movies</h2>
          <UpcomingMovies isDarkMode={isDarkMode}></UpcomingMovies>
        </div>

        {/* Latest Movie News Section */}
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl text-yellow-500 font-bold text-center mb-8">
            Latest Movie News
          </h2>
          <MovieNews isDarkMode={isDarkMode}></MovieNews>
        </div>
      </div>
      <Helmet>
        <title>Movie Portal - Home</title>
      </Helmet>
    </div>
  );
};

export default Home;
