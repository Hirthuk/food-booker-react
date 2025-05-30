import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Login from '../components/Login'

const Favourites = () => {
  const { token, user, backendURL } = useContext(ShopContext)
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.data.success) {
          setFavorites(response.data.favorites)
        }
      } catch (error) {
        console.error('Error fetching favorites:', error)
        toast.error(error.response?.data?.message || 'Failed to load favorites')
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchFavorites()
    }
  }, [token, backendURL])

  const removeFavorite = async (itemId) => {
    try {
      const response = await axios.delete(`${backendURL}/api/favorites/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.data.success) {
        setFavorites(favorites.filter(item => item.item_id !== itemId))
        toast.success(response.data.message)
      }
    } catch (error) {
      console.error('Error removing favorite:', error)
      toast.error(error.response?.data?.message || 'Failed to remove from favorites')
    }
  }

  const addToFavorites = async (itemId) => {
    try {
      const response = await axios.post(`${backendURL}/api/favorites/${itemId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.data.success) {
        toast.success(response.data.message)
        fetchFavorites()
      }
    } catch (error) {
      console.error('Error adding favorite:', error)
      toast.error(error.response?.data?.message || 'Failed to add to favorites')
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Please Login
          </h2>
          <p className="text-gray-600 mb-8">
            You need to be logged in to view your favorites
          </p>
          <Login />
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
        <Link
          to="/items"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Browse Menu
        </Link>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No favorites yet
          </h3>
          <p className="text-gray-500">
            Start adding items to your favorites from the menu!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div
              key={item.item_id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <span className="text-green-600 font-medium">
                    ₹{item.price}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/menu/${item.item_id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => removeFavorite(item.item_id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favourites
