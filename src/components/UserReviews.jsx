import React, { useEffect, useRef, useState } from "react";

const userReviews = [
    {
        username: "Koly",
        profilePic: "https://i.pravatar.cc/50?img=1",
        review: "An amazing platform! The movie selection is vast, and the user interface is top-notch!",
        rating: 5,
    },
    {
        username: "Jane Smith",
        profilePic: "https://i.pravatar.cc/50?img=2",
        review: "Love this site! It has all my favorite movies. Highly recommended!",
        rating: 4.5,
    },
    {
        username: "Samuel Green",
        profilePic: "https://i.pravatar.cc/50?img=3",
        review: "A must-visit for any movie enthusiast. Fantastic experience!",
        rating: 4.8,
    },
    {
        username: "Emily White",
        profilePic: "https://i.pravatar.cc/50?img=4",
        review: "The reviews and movie recommendations are excellent. Keep it up!",
        rating: 4.7,
    },
];

const UserReviews = ({ isDarkMode }) => {
    const cardBgClass = isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800";
    const hoverEffectClass = isDarkMode
        ? "hover:shadow-gray-700"
        : "hover:shadow-gray-300";
    const [animationDuration, setAnimationDuration] = useState(15); 
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            const scrollWidth = container.scrollWidth;
            const clientWidth = container.clientWidth;
            const totalWidth = scrollWidth + clientWidth;

            const duration = totalWidth / 100; 
            setAnimationDuration(duration);
        }
    }, []);

    return (
        <div
            className={`relative overflow-hidden py-12 ${
                isDarkMode ? "bg-gray-900" : "bg-gray-100"
            }`}
        >
          
            <div
                ref={containerRef}
                className="flex space-x-6 animate-marquee"
                style={{
                    animationDuration: `${animationDuration}s`,
                }}
            >
                {userReviews.map((review, index) => (
                    <div
                        key={index}
                        className={`min-w-[300px] sm:min-w-[350px] lg:min-w-[400px] ${cardBgClass} shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4 transform hover:scale-105 transition-transform duration-300 ${hoverEffectClass}`}
                    >
                        <img
                            src={review.profilePic}
                            alt={review.username}
                            className={`w-16 h-16 rounded-full border-4 ${
                                isDarkMode ? "border-gray-600" : "border-gray-300"
                            } shadow-md`}
                        />
                        <h3 className="text-lg font-semibold">
                            {review.username}
                        </h3>
                        <p className="text-sm text-center italic">
                            "{review.review}"
                        </p>
                        <div className="flex space-x-1 text-yellow-500">
                            {Array.from({ length: Math.floor(review.rating) }).map((_, i) => (
                                <span key={i}>&#9733;</span> // Filled star
                            ))}
                            {review.rating % 1 > 0 && <span>&#9733;</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserReviews;
