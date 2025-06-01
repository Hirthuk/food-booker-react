import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyCart = () => {
  const { token, backendURL } = useContext(ShopContext)
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const fetchCart = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.data.success) {
        setCartItems(response.data.cart)
      }
    } catch (error) {
      console.error('Fetch cart error:', error)
      toast.error('Failed to load cart')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchCart()
    } else {
      setLoading(false)
    }
  }, [token])

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await axios.put(
        `${backendURL}/api/cart/${itemId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.data.success) {
        fetchCart()
      }
    } catch (error) {
      console.error('Update quantity error:', error)
      toast.error('Failed to update quantity')
    }
  }

  const removeItem = async (itemId) => {
    try {
      const response = await axios.delete(`${backendURL}/api/cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.data.success) {
        fetchCart()
        toast.success('Item removed from cart')
      }
    } catch (error) {
      console.error('Remove item error:', error)
      toast.error('Failed to remove item')
    }
  }

  const total = cartItems.reduce((sum, item) => sum + (item.item_price * item.quantity), 0)

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Please login to view your cart</h2>
      <p className="text-gray-600">Login to start adding items to your cart</p>
      <motion.button
        className='mt-5 bg-blue-200 px-5 py-2 rounded-md shadow-sm border border-gray-200'
        onClick={() => navigate("/login")}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: 5, repeatDelay: 0, duration: 2, ease: "easeInOut" }}
      >
        Login
      </motion.button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-8 px-2 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 px-2">My Cart</h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-600">Your cart is empty</h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2">Start adding some items to your cart!</p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.cart_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-4 rounded-xl shadow-md mx-2"
              >
                {/* Image */}
                <img
                  src={item.item_url}
                  alt={item.item_name}
                  className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg"
                />

                {/* Item Details - Mobile Layout */}
                <div className="flex flex-col sm:hidden w-full gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{item.item_name}</h3>
                    <p className="text-orange-500 font-medium">₹{item.item_price}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.item_id, item.quantity - 1)}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.item_id, item.quantity + 1)}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold">₹{item.item_price * item.quantity}</p>
                  </div>

                  <button
                    onClick={() => removeItem(item.item_id)}
                    className="w-full p-2 text-red-500 hover:text-red-700 border border-red-500 rounded-lg text-center"
                  >
                    Remove
                  </button>
                </div>

                {/* Item Details - Desktop Layout */}
                <div className="hidden sm:flex flex-1 items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.item_name}</h3>
                    <p className="text-orange-500 font-medium">₹{item.item_price}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.item_id, item.quantity - 1)}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.item_id, item.quantity + 1)}
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                  
                  <p className="font-semibold w-24 text-right">₹{item.item_price * item.quantity}</p>
                  
                  <button
                    onClick={() => removeItem(item.item_id)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="border-t pt-4 mt-6 sm:mt-8 mx-2">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg sm:text-xl font-semibold">Total:</span>
              <span className="text-xl sm:text-2xl font-bold text-orange-500">₹{total}</span>
            </div>
            <div className="flex justify-center">
              <button
                className="w-full md:w-1/3 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base flex flex-row text-center"
                onClick={() => toast.error("Disabled in demo")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyCart
