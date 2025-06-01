import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Shops = () => {
  const { shopOverview, setShopOverview } = useContext(ShopContext)
  const backendURL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const result = await axios.get(backendURL + '/api/shops/getShopoverview')
        setShopOverview(result.data.result);
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchShops()
  }, [backendURL, setShopOverview])

  if (!Array.isArray(shopOverview) || shopOverview.length === 0) {
    return (
      <main className="flex justify-center items-center min-h-[40vh]">
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></span>
        <span className="ml-3 text-lg">Loading shops...</span>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto px-2 py-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {shopOverview.map(shop => (
        <NavLink
          to={`/shop/${shop.shop_id}`}
          key={shop.shop_id}
          className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-4 group"
        >
          <div className="relative pb-[60%] overflow-hidden rounded-lg mb-3 bg-gray-100">
            <img
              src={shop.shop_image}
              alt={shop.shop_name}
              className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition"
              loading="lazy"
            />
            <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded shadow">
              ⭐ {shop.rating}
            </span>
          </div>
          <h2 className="text-lg font-semibold mb-1 truncate">{shop.shop_name}</h2>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{shop.description}</p>
          <span className="inline-block text-xs text-gray-400">Stall: {shop.stall_number}</span>
        </NavLink>
      ))}
    </main>
  )
}

export default Shops
