import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assest'
import axios from 'axios'
import { toast } from 'react-toastify'

const ShopItem = ({ item }) => {
  const { token, backendURL } = useContext(ShopContext)
  const [isFavorite, setIsFavorite] = useState(false)

  // Check if item is in favorites
  useEffect(() => {
    const checkFavorite = async () => {
      if (!token) return
      
      try {
        const response = await axios.get(`${backendURL}/api/favorites/check/${item.item_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        if (response.data.success) {
          setIsFavorite(response.data.isFavorite)
        }
      } catch (error) {
        console.error('Error checking favorite status:', error)
      }
    }

    checkFavorite()
  }, [item.item_id, token, backendURL])

  const toggleFavorite = async () => {
    if (!token) {
      toast.error('Please login to add favorites')
      return
    }

    try {
      if (isFavorite) {
        const response = await axios.delete(`${backendURL}/api/favorites/remove/${item.item_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        if (response.data.success) {
          setIsFavorite(false)
          toast.success('Removed from favorites')
        }
      } else {
        const response = await axios.post(`${backendURL}/api/favorites/add/${item.item_id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        if (response.data.success) {
          setIsFavorite(true)
          toast.success('Added to favorites')
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast.error(error.response?.data?.message || 'Error updating favorites')
    }
  }

  return (
    <div className="relative rounded-2xl shadow-xl overflow-hidden flex flex-col justify-end min-h-[320px] bg-gray-100 group transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:opacity-90"></div>
      <div className="relative z-10 p-6 flex flex-col h-full justify-end">
        <h1 className="text-xl font-bold text-white mb-2 drop-shadow-lg">{item.item_name}</h1>
        <h2 className="text-orange-300 font-bold text-lg mb-4 drop-shadow-lg">₹{item.item_price}</h2>
        <div className="flex items-center space-x-3">
          <button className="flex items-center justify-center w-14 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-lg transition-all duration-200 hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
          <button className="flex items-center justify-center flex-1 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-semibold shadow-lg transition-all duration-200 hover:scale-105 space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Cart</span>
          </button>
          <button 
            onClick={toggleFavorite}
            className={`w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all duration-200 hover:scale-105 ${
              isFavorite 
                ? 'bg-yellow-400 hover:bg-yellow-500' 
                : 'bg-white/20 hover:bg-white/30'
            }`}
          >
            <img 
              src={isFavorite ? assets.star_filled : assets.star_white} 
              alt="star" 
              className="w-6 h-6" 
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShopItem