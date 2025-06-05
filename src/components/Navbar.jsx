import React, { useContext, useState } from 'react'
import { assets } from '../assets/assest'
import { NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [searchBar, setSearchBar] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {searchWord, setSearchWord} = useContext(ShopContext);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/favourites', label: 'Favourites' },
    { to: '/trending', label: 'Trending 📈' },
    { to: '/cart', label: 'My Cart' },
  ];

  return (
    <>
      <header className='flex flex-row items-center justify-between px-4 md:px-6 pt-6 pb-4 border-b border-gray-200 relative mb-4 bg-white'>
        {/* Logo and Buy Me Coffee */}
        <div className='flex items-center gap-4'>
          <NavLink to="/">
            <img 
              className='w-20 h-20 md:w-28 md:h-28 rounded-md cursor-pointer transition-all duration-200 hover:scale-105' 
              src={assets.Logo} 
              alt="Website Logo" 
            />
          </NavLink>
          
          {/* Buy Me Coffee - Desktop */}
          <a 
            href="https://buymeacoffee.com/sharanclouk/e/417901" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 bg-amber-500 hover:bg-amber-600 px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 shadow-sm"
            title="Get Source Code"
          >
            <img 
              src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" 
              alt="Buy me a coffee" 
              className="h-5 w-5"
            />
            <span className="text-xs font-bold text-white ml-1">Source Code</span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className='hidden lg:flex flex-row items-center gap-4 lg:gap-6 mx-4 flex-1 justify-center'>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm lg:text-[15px] font-medium cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-full transition-all duration-200 ${
                  isActive ? 'text-black font-semibold' : 'text-gray-600'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side icons */}
        <div className='flex items-center gap-3 md:gap-4 z-20'>
          {/* Search icon */}
          <NavLink to='/items'>
            <button 
              onClick={() => setSearchBar(true)}
              className='p-2 hover:bg-gray-100 rounded-full transition-all'
            >
              <img 
                className='w-5 h-5 md:w-6 md:h-6' 
                src={assets.search_icon} 
                alt="Search" 
              />
            </button>
          </NavLink>
          
          {/* Profile icon */}
          <NavLink 
            to='/profile' 
            className='p-1 hover:bg-gray-100 rounded-full transition-all'
          >
            <img 
              className='w-8 h-8 lg:w-9 lg:h-9' 
              src={assets.profile_icon} 
              alt="Profile" 
            />
          </NavLink>

          {/* Hamburger Icon */}
          <button
            className="lg:hidden flex flex-col justify-center items-center z-30 ml-1"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <span className={`block w-7 h-[2px] bg-gray-800 mb-1.5 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-7 h-[2px] bg-gray-800 mb-1.5 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-7 h-[2px] bg-gray-800 rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-20 lg:hidden flex flex-col">
            <div className="flex flex-col h-full w-full px-6 pt-20 pb-8">
              {/* Close button */}
              <button
                className="absolute top-6 right-6 p-2"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Menu items */}
              <div className="flex flex-col space-y-5">
                {navLinks.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `text-lg font-medium py-3 px-4 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-gray-100 text-black'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
              
              {/* Buy Me Coffee - Mobile */}
              <a 
                href="https://buymeacoffee.com/sharanclouk/e/417901" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <img 
                  src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" 
                  alt="Buy me a coffee" 
                  className="h-5 w-5"
                />
                <span>Get Source Code</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Search bar */}
      {searchBar && (
        <div className="flex justify-center w-full bg-white border-b border-gray-200 py-3">
          <div className="relative flex items-center w-full max-w-lg px-4">
            <input
              onChange={e => setSearchWord(e.target.value)}
              value={searchWord}
              className="outline-none bg-gray-100 w-full text-black rounded-lg py-2 pl-4 pr-10"
              type="text"
              placeholder="Search products..."
              autoFocus
            />
            <button
              className="absolute right-6 text-gray-500 hover:text-black"
              onClick={() => {
                setSearchBar(false);
                setSearchWord('');
              }}
              aria-label="Close search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
