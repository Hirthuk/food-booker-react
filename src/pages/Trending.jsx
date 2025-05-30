import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assest'
import axios from 'axios'
import { toast } from 'react-toastify'

const Trending = () => {
  const { itemList, token, backendURL } = useContext(ShopContext)
  const [trendingItemIds, setTrendingItemIds] = useState([])
  const [favorites, setFavorites] = useState(new Set())

  // Fetch user's favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) return
      
      try {
        const response = await axios.get(`${backendURL}/api/favorites/user-favorites`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        if (response.data.success) {
          const favoriteIds = new Set(response.data.favorites.map(fav => fav.item_id))
          setFavorites(favoriteIds)
        }
      } catch (error) {
        console.error('Error fetching favorites:', error)
      }
    }

    fetchFavorites()
  }, [token, backendURL])

  // Handle favorite toggle
  const toggleFavorite = async (itemId) => {
    if (!token) {
      toast.error('Please login to add favorites')
      return
    }

    try {
      if (favorites.has(itemId)) {
        // Remove from favorites
        const response = await axios.delete(`${backendURL}/api/favorites/remove/${itemId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        if (response.data.success) {
          setFavorites(prev => {
            const newFavorites = new Set(prev)
            newFavorites.delete(itemId)
            return newFavorites
          })
          toast.success('Removed from favorites')
        }
      } else {
        // Add to favorites
        const response = await axios.post(`${backendURL}/api/favorites/add/${itemId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        if (response.data.success) {
          setFavorites(prev => new Set([...prev, itemId]))
          toast.success('Added to favorites')
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast.error(error.response?.data?.message || 'Error updating favorites')
    }
  }

  // Generate 15 unique random item IDs from the loaded itemList
  useEffect(() => {
    if (Array.isArray(itemList) && itemList.length > 0) {
      // Only consider items with item_id from 1 to 20
      const first20 = itemList.filter(item => Number(item.item_id) >= 1 && Number(item.item_id) <= 30)
      const ids = new Set()
      while (ids.size < 15 && ids.size < first20.length) {
        const randomItem = first20[Math.floor(Math.random() * first20.length)]
        ids.add(randomItem.item_id)
      }
      setTrendingItemIds([...ids])
    }
  }, [itemList])

  const trendingItems = Array.isArray(itemList)
    ? itemList.filter(item => trendingItemIds.includes(item.item_id))
    : []

  if (!Array.isArray(itemList)) {
    return (
      <main className='flex justify-center items-center min-h-[40vh]'>
        <span className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></span>
        <span className='ml-3 text-lg'>Loading Items...</span>
      </main>
    )
  }

  if (trendingItems.length === 0) {
    return (
     <main className='flex justify-center items-center min-h-[40vh]'>
        <span className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></span>
        <span className='ml-3 text-lg'>Loading Items...</span>
      </main>
    )
  }

  return (
    <main className="max-w-7xl mx-auto py-10 px-2 md:px-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {trendingItems.map((item) => (
        <div
          key={item.item_id}
          className="relative rounded-2xl shadow-xl overflow-hidden flex flex-col justify-end min-h-[320px] bg-gray-100 group transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          style={{
            backgroundImage: `url(${item.item_url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>
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
                onClick={() => toggleFavorite(item.item_id)}
                className={`flex items-center justify-center rounded-full p-2 transition ${
                  favorites.has(item.item_id) 
                    ? 'bg-yellow-400 hover:bg-yellow-500' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              >
                <img 
                  src={favorites.has(item.item_id) ? assets.star_filled : assets.star_white} 
                  alt="star" 
                  className="w-6 h-6" 
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </main>
  )
}

export default Trending
