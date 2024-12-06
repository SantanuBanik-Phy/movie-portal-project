import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

const upcomingMoviesData = [
    {
        image: "https://i.ibb.co.com/8m3hskV/a-gladiator-beyond-the-colosseum-2-by-artfulbits-dfsdw73-fullview.jpg",
        title: "Gladiator 2",
        description: "The epic sequel to the Oscar-winning film, following the story of Maximus' son as he seeks revenge and justice in a brutal, gladiatorial world.",
        trailerLink: "https://www.youtube.com/watch?v=GkN0F5dxaWg"
    },
    {
        image: "https://i.ibb.co.com/hs51H4t/1383741.jpg",
        title: "Moana 2",
        description: "The much-anticipated sequel to the hit animated film, where Moana returns to the sea to embark on a new adventure to save her people and the islands.",
        trailerLink: "https://www.youtube.com/watch?v=52pKhV7Xvs4"
    },
    {
        image: "https://i.ibb.co.com/10GVjYn/1319608.jpg",
        title: "Kraven the Hunter",
        description: "A thrilling action film about the iconic Spider-Man villain, Kraven, as he embarks on a dangerous quest to prove himself as the world's greatest hunter.",
        trailerLink: "https://www.youtube.com/watch?v=76spPHtnzjM"
    }
];

const UpcomingMovies = ({ isDarkMode }) => {
    const textColorClass = isDarkMode ? "text-white" : "text-black";
    const bgColorClass = isDarkMode ? "bg-gray-800" : "bg-white";

    return (
        <div className={`container max-w-6xl mx-auto px-4 my-12 shadow-xl rounded-lg`}>
            <Swiper
                modules={[Navigation, Autoplay, EffectFade]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                loop={true}
                autoplay={{ delay: 4000 }}
                effect="fade"
                fadeEffect={{ crossFade: true }}
            >
                {upcomingMoviesData.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <div className={`card shadow-2xl transition-transform transform hover:scale-105 p-6 rounded-xl ${bgColorClass}`}>
                            {/* Image Section */}
                            <figure className="h-[550px] rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    className="w-full h-full object-cover transition-transform transform hover:scale-110 duration-300"
                                />
                            </figure>

                            {/* Content Section */}
                            <div className="card-body p-6">
                                <h2 className={`text-4xl font-semibold mb-4 ${textColorClass} transition-transform transform hover:translate-x-1`}>
                                    {movie.title}
                                </h2>
                                <p className={`text-lg mb-4 ${textColorClass}`}>
                                    {movie.description}
                                </p>
                                <a
                                    href={movie.trailerLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn text-white bg-gradient-to-r from-[#19284a] to-[#619bca] hover:scale-105 transition-all ease-in-out duration-300 mt-4 px-6 py-3 rounded-full shadow-lg"
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
