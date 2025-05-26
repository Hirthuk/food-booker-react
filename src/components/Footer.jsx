import React from 'react'
import { assets } from '../assets/assest'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const icons = [
    {src: assets.instagram, alt: 'Instagram', URL: "https://www.instagram.com/sharan_13_09/"},
    {src: assets.whatsapp, alt: "WhatsApp", URL: "tel:9030980684"},
    {src: assets.linkedin, alt: "Linkedin", URL: "https://www.linkedin.com/in/sharankumar-p-g3/"},
    {src: assets.twitter, alt: "twitter", URL: "https://x.com/Sharankuma61629"}
  ]
  return (
    <footer className="w-full bg-gradient-to-tr from-orange-400 via-rose-400 to-yellow-400 text-white py-8 px-4 mt-10 shadow-inner rounded-lg">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Social Icons */}
        <div className="flex flex-row items-center justify-center gap-5 md:gap-7">
          {icons.map((item, index) => (
            <a
              key={index}
              href={item.URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-200 hover:scale-110 p-2 rounded-full bg-white/10 hover:bg-white/20 shadow-lg"
              aria-label={item.alt}
            >
              <img
                className="w-8 h-8 md:w-10 md:h-10 rounded-md shadow-md group-hover:shadow-xl transition"
                src={item.src}
                alt={item.alt}
                loading="lazy"
              />
            </a>
          ))}
        </div>

        {/* Contact Link */}
        <div className="flex flex-col items-center gap-2">
          <Link 
            to="/contact" 
            className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Contact Developer
          </Link>
          <span className="text-xs text-white/80">Have questions? Reach out!</span>
        </div>

        {/* Copyright */}
        <div className="text-xs md:text-sm text-white/90 text-center md:text-right">
          &copy; {currentYear} <span className="font-semibold tracking-wide">FoodBooker</span>. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
