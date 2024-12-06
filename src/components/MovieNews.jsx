import React from "react";

const movieNewsData = [
    {
        title: "Avatar: The Way of Water Makes a Splash with $134 Million Debut",
        description: "James Cameron's long-awaited sequel makes a big splash at the box office, exceeding expectations.",
        image: "https://i.ibb.co.com/9wwX0Y2/avatar.webp",
        link: "https://www.hollywoodreporter.com/movies/movie-news/avatar-the-way-of-water-box-office-opening-weekend-1235281345/",
    },
    {
        title: "The Batman: Is it a Box-Office Hit?",
        description: "Matt Reeves' dark and gritty take on the Caped Crusader breaks records and impresses critics.",
        image: "https://i.ibb.co.com/hsJjpG8/the-batman-title-poster-j2ft6omd0csyg22b.jpg",
        link: "https://www.hollywoodreporter.com/movies/movie-news/the-batman-box-office-milestone-1235112645/",
    },
    {
        title: "No Time to Die: Is it a Box-Office Success?",
        description: "Daniel Craig's final outing as James Bond faces challenges but ultimately delivers a satisfying conclusion.",
        image: "https://i.ibb.co.com/Pw8GbRp/1196813.jpg",
        link: "https://www.hollywoodreporter.com/movies/movie-news/no-time-to-die-box-office-projections-1235018846/",
    },
];

const MovieNews = ({ isDarkMode }) => {
    // Define dynamic classes based on isDarkMode
    const textColorClass = isDarkMode ? "text-white" : "text-black";
    const bgColorClass = isDarkMode ? "bg-gray-800" : "bg-white";
    const cardTextColorClass = isDarkMode ? "text-gray-300" : "text-gray-600";

    return (
        <div className={`container mx-auto p-10  ${textColorClass}`}>
           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {movieNewsData.map((news, index) => (
                    <div
                        key={index}
                        className={`relative overflow-hidden transform transition-all duration-300 shadow-lg hover:scale-105 rounded-lg ${bgColorClass}`}
                    >
                        {/* Image Section */}
                        <div className="relative group">
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-full h-64 object-cover rounded-t-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <a
                                    href={news.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-yellow-400 text-lg font-bold underline"
                                >
                                    Read More
                                </a>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4 flex flex-col justify-between">
                            <h2 className={`text-xl font-semibold mb-2 ${textColorClass}`}>
                                {news.title}
                            </h2>
                            <p className={`text-sm line-clamp-3 ${cardTextColorClass}`}>
                                {news.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieNews;
