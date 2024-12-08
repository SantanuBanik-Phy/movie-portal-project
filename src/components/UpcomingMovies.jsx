import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const upcomingMoviesData = [
    {
        image: "https://i.ibb.co/8m3hskV/a-gladiator-beyond-the-colosseum-2-by-artfulbits-dfsdw73-fullview.jpg",
        title: "Gladiator 2",
        description: "The epic sequel to the Oscar-winning film, following the story of Maximus' son as he seeks revenge and justice in a brutal, gladiatorial world.",
        trailerLink: "https://www.youtube.com/watch?v=GkN0F5dxaWg",
    },
    {
        image: "https://i.ibb.co/hs51H4t/1383741.jpg",
        title: "Moana 2",
        description: "The much-anticipated sequel to the hit animated film, where Moana returns to the sea to embark on a new adventure to save her people and the islands.",
        trailerLink: "https://www.youtube.com/watch?v=52pKhV7Xvs4",
    },
    {
        image: "https://i.ibb.co/10GVjYn/1319608.jpg",
        title: "Kraven the Hunter",
        description: "A thrilling action film about the iconic Spider-Man villain, Kraven, as he embarks on a dangerous quest to prove himself as the world's greatest hunter.",
        trailerLink: "https://www.youtube.com/watch?v=76spPHtnzjM",
    },
];

const UpcomingMovies = ({ isDarkMode }) => {
    const textColorClass = isDarkMode ? "text-white" : "text-black";
    const bgColorClass = isDarkMode ? "bg-gray-900" : "bg-gray-100";

    return (
        <div className={`container max-w-6xl mx-auto px-4 `}>
           
            <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
               
            >
                {upcomingMoviesData.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className={`relative flex flex-col md:flex-row items-center justify-between p-8 rounded-xl shadow-lg overflow-hidden ${bgColorClass}`}
                            style={{ minHeight: "450px" }}
                        >
                            {/* Image Section */}
                            <div className="w-full md:w-1/2 h-64 md:h-full">
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    className="h-full w-full object-cover rounded-xl transition-transform transform hover:scale-110 duration-500"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-8 text-center md:text-left">
                                <h2
                                    className={`text-3xl font-bold mb-4 ${textColorClass} transition-transform transform hover:translate-x-2`}
                                >
                                    {movie.title}
                                </h2>
                                <p className={`text-lg mb-4 ${textColorClass}`}>
                                    {movie.description}
                                </p>
                                <a
                                    href={movie.trailerLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-gradient-to-r from-[#19284a] to-[#619bca] text-white py-3 px-6 rounded-full text-lg shadow-lg hover:scale-105 transition-transform duration-300"
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
