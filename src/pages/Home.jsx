import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
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
        _id: "fake1",
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
    {
      poster: "https://example.com/posters/movie3.jpg",
      title: "Love in the Digital Age",
      genre: ["Romance", "Drama"],
      duration: 95,
      releaseYear: 2022,
      rating: 4.3,
      summary: "Two tech enthusiasts discover love and heartbreak while building a groundbreaking AI project together.",
      _id: "fake3",
    },

];

const Home = () => {
  const movies = useLoaderData()
   
    const [loadedMovies, setLoadedMovies] = useState(movies);
   

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch("http://localhost:3000/movies"); // Fetch MongoDB movies
                const mongoMovies = await response.json();

                // Merge fakeMovies with MongoDB movies
                const allMovies = [...fakeMovies, ...mongoMovies];

                // Sort movies by rating (descending) and take the top 6
                const featuredMovies = allMovies.sort((a, b) => b.rating - a.rating).slice(0, 6);

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
