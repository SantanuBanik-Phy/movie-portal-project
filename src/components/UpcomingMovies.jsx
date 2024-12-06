import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

const upcomingMoviesData = [
    {
        image: "https://example.com/upcoming-movies/image1.jpg", // Replace with actual image URLs
        title: "The Lost City of Z",
        description: "A thrilling adventure film based on the true story of Percy Fawcett, a British explorer who disappeared in the Amazon while searching for a lost civilization.",
        trailerLink: "https://www.youtube.com/watch?v=lT_ywUOu3Xw",
    },
    {
        image: "https://example.com/upcoming-movies/image2.jpg",
        title: "The Grand Budapest Hotel",
        description: "A visually stunning and whimsical film about a concierge at a famous European hotel who becomes involved in a web of intrigue and adventure.",
        trailerLink: "https://www.youtube.com/watch?v=1Fg5iWmQjwk",
    },
    {
        image: "https://example.com/upcoming-movies/image3.jpg",
        title: "The Shape of Water",
        description: "A unique and moving love story between a mute woman and an amphibious creature held captive in a high-security government laboratory.",
        trailerLink: "https://www.youtube.com/watch?v=XFYWazblaUA",
    },
];

const UpcomingMovies = ({ isDarkMode }) => {
    const textColorClass = isDarkMode ? "text-white" : "text-black";
    const bgColorClass = isDarkMode ? "bg-gray-800" : "bg-white";

    return (
        <div className={`container max-w-6xl mx-auto px-2 my-12 ${bgColorClass}`}>
            <Swiper
                modules={[Navigation, Autoplay, EffectFade]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                loop={true}
                autoplay={{ delay: 3000 }}
                effect="fade"
                fadeEffect={{ crossFade: true }}
            >
                {upcomingMoviesData.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <div className={`card shadow-xl p-6 rounded-none ${bgColorClass}`}>
                            {/* Image Section */}
                            <figure className="h-96">
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                />
                            </figure>

                            {/* Content Section */}
                            <div className="card-body">
                                <h2 className={`text-3xl font-bold mb-4 ${textColorClass}`}>
                                    {movie.title}
                                </h2>
                                <p className={`text-base mb-4 ${textColorClass}`}>
                                    {movie.description}
                                </p>
                                <a
                                    href={movie.trailerLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn text-white bg-gradient-to-l from-[#0B98AC] to-[#8ec90d] mt-4"
                                >
                                    Watch Trailer
                                </a>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default UpcomingMovies;
