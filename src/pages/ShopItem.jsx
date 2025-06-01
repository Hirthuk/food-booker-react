import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assest'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'

const ShopItem = () => {
  const { id } = useParams()
  const { itemList, token, user, backendURL } = useContext(ShopContext)
  const [favorites, setFavorites] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [shopInfo, setShopInfo] = useState(null)

  // Fetch favorites on mount
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(`${backendURL}/api/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.data.success) {
          // Create a Set of favorite item IDs
          const favoriteIds = new Set(response.data.favorites.map(fav => fav.item_id))
          setFavorites(favoriteIds)
        }
      } catch (error) {
        console.error('Error fetching favorites:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [token, backendURL]) // Dependencies for re-fetch

  // Updated toggleFavorite function
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
      toast.error(error.response?.data?.message || 'Error updating favorites')
    }
  }

  // Update loading state management
  useEffect(() => {
    let mounted = true

    const initialize = async () => {
      try {
        // Fetch shop info
        if (id) {
          const shopResponse = await axios.get(`${backendURL}/api/shops/${id}`)
          if (mounted && shopResponse.data.success) {
            setShopInfo(shopResponse.data.shop)
          }
        }
      } catch (error) {
        console.error('Initialization error:', error)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    initialize()
    return () => { mounted = false }
  }, [id, token, backendURL])

  const filteredItems = Array.isArray(itemList)
    ? itemList.filter(item => Number(item.shop_id) === Number(id))
    : []

  const addToCart = async (itemId) => {
    if (!token) {
      toast.error('Please login to add items to cart')
      return
    }

    try {
      const response = await axios.post(
        `${backendURL}/api/cart/add`,
        { itemId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        toast.success('Added to cart')
      }
    } catch (error) {
      console.error('Add to cart error:', error)
      toast.error('Failed to add item to cart')
    }
  }

  if (!Array.isArray(itemList)) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 md:px-8">
      {/* Shop Header */}
      {shopInfo && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 bg-white rounded-2xl shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img 
              src={shopInfo.image_url || assets.default_shop} 
              alt={shopInfo.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-orange-500"
            />
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800">{shopInfo.name}</h1>
              <p className="text-gray-600 mt-2">{shopInfo.description}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Items Grid */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-gray-600">
          <img src={assets.empty_state} alt="No items" className="w-32 h-32 mb-4 opacity-50" />
          <p className="text-xl font-medium">No items found in this shop</p>
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.item_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-2xl shadow-lg overflow-hidden flex flex-col justify-end min-h-[340px] bg-gray-100 group hover:shadow-2xl transform transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundImage: `url(${item.item_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
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
                      onClick={() => (toast.error("Disabled in demo"))}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl flex-1"
                    >
                      Buy
                    </motion.button>
                    
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(item.item_id)}
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
      )}
    </div>
  )
}

export default ShopItem