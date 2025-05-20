import React, { useState } from 'react'
import { assets } from '../assets/assest'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const [searchBar, setSearchBar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/favourites', label: 'FAVOURITES' },
    { to: '/trending', label: 'TRENDING📈' },
    { to: '/cart', label: 'MY CART' },
  ];

  return (
    <>
      <header className='flex flex-row items-center justify-between px-4 py-2 mt-10 border-b-2 border-white pb-4 relative'>
        {/* Logo */}
        <NavLink to="/" className='cursor-pointer z-20'>
          <img 
            className='w-24 h-24 md:w-32 md:h-32 rounded-md cursor-pointer shadow-md' 
            src={assets.Logo} 
            alt="Website Logo" 
          />
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className='hidden lg:flex flex-row items-center gap-6 lg:gap-8 mx-4 flex-1 justify-center'>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm lg:text-base font-bold cursor-pointer hover:bg-black hover:text-white px-2 py-2 rounded-md transition-colors duration-200 ${
                  isActive ? 'bg-black text-white' : ''
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <p>{link.label}</p>
            </NavLink>
          ))}
        </nav>

        {/* Right side elements (profile, hamburger, search icon) */}
        <div className='flex items-center gap-4 z-20'>
          {/* Search icon */}
          <button 
            onClick={() => setSearchBar(true)}
            className='p-1 hover:bg-gray-100 hover:bg-opacity-20 rounded-full'
          >
            <img 
              className='w-6 h-6' 
              src={assets.search_icon} 
              alt="Search" 
            />
          </button>
          
          {/* Profile icon */}
          <NavLink to='/profile' className='p-1 hover:bg-gray-100 hover:bg-opacity-20 rounded-full'>
            <img 
              className='w-8 h-8 lg:w-10 lg:h-10' 
              src={assets.profile_icon} 
              alt="Profile" 
            />
          </NavLink>

          {/* Hamburger Icon - visible on tablet/mobile, always at far right */}
          <button
            className="lg:hidden flex flex-col justify-center items-center z-30 ml-2"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <span className={`block w-7 h-1 bg-black mb-1 rounded transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-7 h-1 bg-black mb-1 rounded transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-7 h-1 bg-black rounded transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-20 lg:hidden flex flex-col" onClick={() => setMobileMenuOpen(false)}>
            <div
              className="flex flex-col justify-center items-center h-full w-full bg-white"
              onClick={e => e.stopPropagation()}
            >
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `w-full max-w-md text-center text-lg font-bold px-6 py-4 rounded-md transition-all duration-200 mb-2 ${
                      isActive
                        ? 'bg-black text-white scale-105'
                        : 'text-black hover:bg-gray-200 hover:scale-105 hover:shadow-lg'
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Search bar below navbar */}
      {searchBar && (
        <div className="flex justify-center w-full bg-white border-b border-gray-200 py-4">
          <div className="relative flex items-center w-full max-w-lg px-4">
            <input
              className="outline-none bg-gray-100 w-full text-black rounded-md py-2 pl-4 pr-10 shadow"
              type="text"
              placeholder="Search..."
              autoFocus
            />
            <button
              className="absolute right-6 text-gray-500 hover:text-black text-xl"
              onClick={() => setSearchBar(false)}
              aria-label="Close search"
              tabIndex={0}
              type="button"
            >
              &#10005;
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar