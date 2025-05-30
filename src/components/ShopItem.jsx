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
      {/* ...existing item content... */}
      <div className="relative z-10 p-6 flex flex-col h-full justify-end">
        <h1 className="text-xl font-bold text-white mb-2 drop-shadow-lg">{item.item_name}</h1>
        <h2 className="text-orange-300 font-bold text-lg mb-4 drop-shadow-lg">₹{item.item_price}</h2>
        <div className="flex flex-row gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-blue-400">
            Buy
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-orange-400">
            Add to cart
          </button>
          <button 
            onClick={toggleFavorite}
            className={`flex items-center justify-center rounded-full p-2 transition ${
              isFavorite 
                ? 'bg-yellow-400 hover:bg-yellow-500' 
                : 'bg-white/20 hover:bg-white/40'
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