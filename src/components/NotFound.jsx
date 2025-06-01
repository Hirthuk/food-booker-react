import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assest';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-orange-50 to-yellow-100 px-4 py-10">
      <img
        src={assets.PageNotFound}
        alt="404 Page not found"
        className="w-64 sm:w-80 md:w-96 mb-8 rounded-2xl shadow-xl animate-bounce-slow"
        style={{ animation: 'bounce 2.5s infinite alternate' }}
      />
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-indigo-700 drop-shadow-lg text-center">
        404 - Page Not Found
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-center max-w-xl mb-8 text-gray-700">
        Oops! Looks like you’ve hit a dead end.<br className="hidden sm:inline" />
        Don’t worry — we’ll help you find your way back!
      </p>
      <Link
        to="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-200 text-lg flex items-center gap-2"
      >
        <span role="img" aria-label="Home">🏠</span> Go to Home
      </Link>
      <style>
        {`
          @keyframes bounce {
            0% { transform: translateY(0);}
            100% { transform: translateY(-16px);}
          }
        `}
      </style>
    </div>
  );
};

export default NotFound;