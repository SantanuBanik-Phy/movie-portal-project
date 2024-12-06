import React from "react";
import { Carousel } from "react-responsive-carousel";
import 'animate.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles for the carousel

const Banner = () => {
  const slides =[
    {
      "id": 1,
      "image": "https://i.ibb.co.com/nn6vvXX/wallpapersden-com-oppenheimer-official-5k-poster-5120x2858.jpg",
      "title": "Oppenheimer",
      "description": "The story of J. Robert Oppenheimer, the scientist who led the development of the atomic bomb during World War II, grappling with the moral consequences of his work."
    },
    {
      "id": 2,
      "image": "https://i.ibb.co.com/7g1qsKm/Interstellar.jpg",
      "title": "Interstellar",
      "description": "A group of astronauts travels through a wormhole near Saturn in search of a new home for humanity, encountering unimaginable challenges in space and time."
    },
    {
      "id": 3,
      "image": "https://i.ibb.co.com/2cddqfy/avengersendgame-lob-mas-mob-01.jpg",
      "title": "Avengers: Endgame",
      "description": "The Avengers assemble one final time to undo the catastrophic damage caused by Thanos, risking everything in an epic battle to save the universe."
    },
    {
      "id": 4,
      "image": "https://i.ibb.co.com/5jRgnJz/original.jpg",
      "title": "Titanic",
      "description": "A young couple from different social backgrounds fall in love aboard the doomed RMS Titanic, as they face the tragic sinking of the ship during its maiden voyage."
    }
  ]
  

  return (
    <div className="bg-neutral text-neutral-content">
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
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
              className="w-full h-[450px] md:h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
              <h2 className="md:text-5xl text-4xl text-yellow-500  font-bold mb-2 animate__animated animate__slideInDown">{slide.title}</h2>
              <p className="mb-4 animate__animated animate__slideInUp">{slide.description}</p>
             
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
