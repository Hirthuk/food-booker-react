import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assest'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'

const Trending = () => {
  const { itemList, token, backendURL } = useContext(ShopContext)
  const [trendingItemIds, setTrendingItemIds] = useState([])
  const [favorites, setFavorites] = useState(new Set())
  const [loading, setLoading] = useState(true)

  // Fetch favorites and initialize trending items
  useEffect(() => {
    const initialize = async () => {
      try {
        // Fetch favorites if logged in
        if (token) {
          const response = await axios.get(`${backendURL}/api/favorites`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          
          if (response.data.success) {
            const favoriteIds = new Set(response.data.favorites.map(fav => fav.item_id))
            setFavorites(favoriteIds)
          }
        }

        // Generate trending items
        if (Array.isArray(itemList) && itemList.length > 0) {
          const first30 = itemList.filter(item => Number(item.item_id) >= 1 && Number(item.item_id) <= 30)
          const ids = new Set()
          while (ids.size < 15 && ids.size < first30.length) {
            const randomItem = first30[Math.floor(Math.random() * first30.length)]
            ids.add(randomItem.item_id)
          }
          setTrendingItemIds([...ids])
        }
      } catch (error) {
        console.error('Initialization error:', error)
        toast.error('Failed to load content')
      } finally {
        setLoading(false)
      }
    }

    initialize()
  }, [token, backendURL, itemList])

  const toggleFavorite = async (itemId) => {
    if (!token) {
      toast.error('Please login to add favorites')
      return
    }

    try {
      if (favorites.has(itemId)) {
        const response = await axios.delete(`${backendURL}/api/favorites/${itemId}`, {
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
        const response = await axios.post(`${backendURL}/api/favorites/${itemId}`, {}, {
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
      toast.error('Error updating favorites')
    }
  }

  const trendingItems = Array.isArray(itemList)
    ? itemList.filter(item => trendingItemIds.includes(item.item_id))
    : []

  if (loading || !Array.isArray(itemList)) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <main className="max-w-7xl mx-auto py-10 px-2 md:px-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-800 mb-8 text-center"
      >
        Trending Items
      </motion.h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence>
          {trendingItems.map((item, index) => (
            <motion.div
              key={item.item_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.1 }}
              className="relative rounded-2xl shadow-xl overflow-hidden flex flex-col justify-end min-h-[320px] bg-gray-100 group hover:shadow-2xl transform transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundImage: `url(${item.item_url})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            >
              {/* Favorite Badge */}
              {favorites.has(item.item_id) && (
                <div className="absolute top-4 left-4 bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg z-20">
                  Favorite
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300"></div>
              
              <div className="relative z-10 p-6 flex flex-col h-full justify-end">
                <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg group-hover:transform group-hover:translate-y-[-4px] transition-transform">
                  {item.item_name}
                </h2>
                <p className="text-xl text-yellow-300 font-semibold mb-4 drop-shadow-lg">₹{item.item_price}</p>
                
                <div className="flex gap-3 items-center">

                  <motion.button 
                  onClick={()  => (toast.error("Disabled in demo"))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl flex-1"
                  >
                    Buy
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl flex-1"
                  >
                  Cart
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleFavorite(item.item_id)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all duration-200 ${
                      favorites.has(item.item_id)
                        ? 'bg-yellow-400 hover:bg-yellow-500'
                        : 'bg-white/20 hover:bg-white/30'
                    }`}
                  >
                    <img 
                      src={favorites.has(item.item_id) ? assets.start_color : assets.star_white} 
                      alt="favorite"
                      className="w-6 h-6 transform transition-transform duration-200 hover:scale-110"
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  )
}

export default Trending
