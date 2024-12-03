import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
// import 'animate.css';
import { NavLink } from "react-router-dom";


const Banner = () => {
  const slides = [
    {
      "id": 1,
      "image": "https://example.com/images/movie1.jpg",
      "title": "The Eternal Quest",
      "description": "An epic adventure into a magical world where secrets and ancient powers await the brave explorers."
    },
    {
      "id": 2,
      "image": "https://example.com/images/movie2.jpg",
      "title": "Shadows of the Past",
      "description": "A thrilling mystery that takes you into the depths of a detective's troubled past."
    },
    {
      "id": 3,
      "image": "https://example.com/images/movie3.jpg",
      "title": "Love in the Digital Age",
      "description": "A heartwarming drama about love, heartbreak, and technology's role in modern relationships."
    },
    {
      "id": 4,
      "image": "https://example.com/images/movie4.jpg",
      "title": "The Last Outpost",
      "description": "An action-packed battle for humanity's survival against an alien invasion at the edge of the galaxy."
    },
    {
      "id": 5,
      "image": "https://example.com/images/movie5.jpg",
      "title": "Comedy Nights",
      "description": "A hilarious journey of a stand-up comedian chasing his dreams amidst life's chaos and humor."
    },
    {
      "id": 6,
      "image": "https://example.com/images/movie6.jpg",
      "title": "Horror in the Woods",
      "description": "A spine-chilling tale of survival and terror as friends face an ancient evil in a secluded forest."
    }
  ]
  
  
  return (
    <div className="bg-neutral text-neutral-content">
      <Swiper
        navigation={true}
        loop={true}
        autoplay={{ delay: 3000 }}
        modules={[Navigation,Autoplay]}
        className="mySwiper w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
                <h2 className="md:text-5xl text-4xl font-bold mb-2 animate__animated animate__slideInDown">{slide.title}</h2>
                <p className="mb-4 animate__animated animate__slideInUp ">{slide.description}</p>
                <NavLink to="/aboutUs"><button className="btn  bg-green-500 rounded-xl">About Us</button></NavLink>
                
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
