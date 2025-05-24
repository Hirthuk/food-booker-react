import React, { useRef, useState, useEffect } from "react";
import { assets } from "../assets/assest";
import { NavLink } from "react-router-dom";

// Carousel images (replace with your own if desired)

const images = [
  { src: assets.image1, alt: "Delicious food 1" },
  { src: assets.image2, alt: "Delicious food 2" },
  { src: assets.image3, alt: "Delicious food 3" },
  { src: assets.image4, alt: "Delicious food 4" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef(null);

  // Auto-rotate logic
  useEffect(() => {
    if (!paused) {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 2000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, paused]);

  // Manual navigation
  const goTo = (idx) => setCurrent(idx);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  
  return (
    <header
      className='flex flex-col items-center justify-center h-screen bg-cover bg-center relative -mt-7 bg-white'
    >
      {/* You can add hero content here */}
      <section className="w-full min-h-[80vh] flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-100 px-4 py-8 shadow-lg rounded-lg">
        {/* Left: Heading, subtitle, CTA */}
        <div className=" w-full lg:w-1/2 flex flex-col items-start justify-center mb-8 lg:mb-0">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 md:ml-8">
            Discover Best Food Near You
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6 hidden md:block md:ml-8">
            Order your favorite meals from our vendors. Fast delivery, fresh food, and satisfaction guaranteed.
          </p>
          <NavLink
          to={"/items"}
          className="flex items-center justify-center">
            <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors border-white flex text-center items-center md:ml-8"
            aria-label="Order Now"
          >
            Order Now
          </button>
          </NavLink>
        </div>

        {/* Right: Carousel */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          <div
            className="relative w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden shadow-xl bg-white"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <img
              key={images[current].src}
              src={images[current].src}
              alt={images[current].alt}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-500"
              draggable={false}
            />
            {/* Left arrow */}
            <button
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-orange-100 text-gray-700 rounded-full p-2 shadow transition"
              onClick={prev}
              tabIndex={0}
            >
              <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            {/* Right arrow */}
            <button
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-orange-100 text-gray-700 rounded-full p-2 shadow transition"
              onClick={next}
              tabIndex={0}
            >
              <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 5l7 7-7 7"/></svg>
            </button>
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`w-3 h-3 rounded-full border-2 ${current === idx ? "bg-orange-500 border-orange-500" : "bg-white border-gray-300"} transition`}
                  onClick={() => goTo(idx)}
                  tabIndex={0}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Hero;
