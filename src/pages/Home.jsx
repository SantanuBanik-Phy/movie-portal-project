import React from 'react';
import Banner from '../components/Banner';
import MovieCard from '../components/MovieCard';
import { Link } from 'react-router-dom';


const movieData =[
    {
      "poster": "https://example.com/posters/movie1.jpg",
      "title": "The Eternal Quest",
      "genre": ["Adventure", "Fantasy"],
      "duration": 140,
      "releaseYear": 2023,
      "rating": 4.8,
      "summary": "A group of explorers embarks on a magical journey to uncover an ancient secret that could change the world forever."
    },
    {
      "poster": "https://example.com/posters/movie2.jpg",
      "title": "Shadows of the Past",
      "genre": ["Mystery", "Thriller"],
      "duration": 120,
      "releaseYear": 2021,
      "rating": 4.5,
      "summary": "A detective must confront his own past while solving a string of mysterious disappearances in a small town."
    },
    {
      "poster": "https://example.com/posters/movie3.jpg",
      "title": "Love in the Digital Age",
      "genre": ["Romance", "Drama"],
      "duration": 95,
      "releaseYear": 2022,
      "rating": 4.3,
      "summary": "Two tech enthusiasts discover love and heartbreak while building a groundbreaking AI project together."
    },
    {
      "poster": "https://example.com/posters/movie4.jpg",
      "title": "The Last Outpost",
      "genre": ["Action", "Sci-Fi"],
      "duration": 130,
      "releaseYear": 2020,
      "rating": 4.7,
      "summary": "In a war-torn future, a group of soldiers defends humanity's final outpost from a relentless alien invasion."
    },
    {
      "poster": "https://example.com/posters/movie5.jpg",
      "title": "Comedy Nights",
      "genre": ["Comedy"],
      "duration": 105,
      "releaseYear": 2024,
      "rating": 4.1,
      "summary": "A stand-up comedian navigates the ups and downs of life, love, and career while chasing his dreams of stardom."
    },
    {
      "poster": "https://example.com/posters/movie6.jpg",
      "title": "Horror in the Woods",
      "genre": ["Horror"],
      "duration": 110,
      "releaseYear": 2019,
      "rating": 4.2,
      "summary": "A group of friends on a camping trip find themselves hunted by an ancient evil lurking in the forest."
    }
  ]
  












const Home = () => {
     // Sort movies by rating in descending order and take top 6
     const featuredMovies = movieData.sort((a, b) => b.rating - a.rating).slice(0, 6);

   

    return (
        <div>
         <Banner></Banner>
          {/* Featured Movies Section */}
          <div className="container mx-auto p-6 my-12">
                <h2 className="text-3xl font-bold text-center mb-8">Featured Movies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredMovies.map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                    ))}
                </div>
                <div className="text-center mt-8">
                    <Link to="/all-movies" className="btn btn-primary">See All Movies</Link>
                </div>
            </div>
    
      
      
     

        </div>
    );
};

export default Home;