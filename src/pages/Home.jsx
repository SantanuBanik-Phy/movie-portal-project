import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import MovieCard from "../components/MovieCard";
import UpcomingMovies from "../components/UpcomingMovies";
import MovieNews from "../components/MovieNews";
import { Helmet } from "react-helmet";
import UserReviews from "../components/UserReviews";

const Home = () => {
  const movies = useLoaderData() || [];
  const [loading, setLoading] = useState(true);
  const [loadedMovies, setLoadedMovies] = useState(movies);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }

    const fetchMovies = async () => {
      try {
        const response = await fetch("https://b10-a10-server-site.vercel.app/movies");
        const mongoMovies = await response.json();

        if (Array.isArray(mongoMovies)) {
          const featuredMovies = mongoMovies.sort((a, b) => b.rating - a.rating).slice(0, 6);
          setLoadedMovies(featuredMovies);
        } else {
          console.error("Fetched data is not an array:", mongoMovies);
          setLoadedMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoadedMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Toggle Theme
  const handleThemeToggle = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen transition-colors">
        <div className="py-1 pr-6 flex justify-end items-center">
          <div
            onClick={handleThemeToggle}
            className="flex items-center bg-gray-300 dark:bg-gray-600 w-14 h-8 rounded-full p-1 cursor-pointer transition-all"
          >
            <div
              className={`transform transition-all duration-300 w-6 h-6 bg-yellow-400 dark:bg-blue-500 rounded-full ${
                isDarkMode ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>

        {loading ? (
          <div className="text-center">
            <span className="loading loading-infinity loading-lg"></span>
          </div>
        ) : (
          <>
            <Banner />

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

        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold ml-24 text-yellow-500 mb-8">
            Upcoming Movies
          </h2>
          <UpcomingMovies isDarkMode={isDarkMode}></UpcomingMovies>
        </div>

        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl text-yellow-500 font-bold text-center mt-8 mb-4">
            Latest Movie News
          </h2>
          <MovieNews isDarkMode={isDarkMode}></MovieNews>
        </div>

        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl text-yellow-500 font-bold text-center mb-8">
            User Reviews
          </h2>
          <UserReviews isDarkMode={isDarkMode} />
        </div>
      </div>
      <Helmet>
        <title>Movie Portal - Home</title>
      </Helmet>
    </div>
  );
};

export default Home;
