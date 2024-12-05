import React from "react";
import { Carousel } from "react-responsive-carousel";
import { NavLink } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles for the carousel

const Banner = () => {
  const slides = [
    {
      id: 1,
      image: "https://example.com/images/movie1.jpg",
      title: "The Eternal Quest",
      description: "An epic adventure into a magical world where secrets and ancient powers await the brave explorers."
    },
    {
      id: 2,
      image: "https://example.com/images/movie2.jpg",
      title: "Shadows of the Past",
      description: "A thrilling mystery that takes you into the depths of a detective's troubled past."
    },
    {
      id: 3,
      image: "https://example.com/images/movie3.jpg",
      title: "Love in the Digital Age",
      description: "A heartwarming drama about love, heartbreak, and technology's role in modern relationships."
    },
    {
      id: 4,
      image: "https://example.com/images/movie4.jpg",
      title: "The Last Outpost",
      description: "An action-packed battle for humanity's survival against an alien invasion at the edge of the galaxy."
    },
  
  ];

  return (
    <div className="bg-neutral text-neutral-content">
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        interval={2000}
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        transitionTime={500}
        className="w-full"
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
              <h2 className="md:text-5xl text-4xl font-bold mb-2">{slide.title}</h2>
              <p className="mb-4">{slide.description}</p>
              <NavLink to="/aboutUs">
                <button className="btn bg-green-500 rounded-xl">About Us</button>
              </NavLink>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
