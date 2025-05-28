import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assest'

const ShopItem = () => {
  const { id } = useParams()
  const { itemList } = useContext(ShopContext)
  
  // Filter items for this shop (type-safe)
  const filteredItems = Array.isArray(itemList)
    ? itemList.filter(item => Number(item.shop_id) === Number(id))
    : []
  
    // console.log(itemList);
  // Show loading spinner only if itemList is undefined/null (not just empty)
  if (!Array.isArray(itemList)) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></span>
        <span className="ml-3 text-lg">Loading items...</span>
      </div>
    )
  }

  // Show "No items" if loaded and filteredItems is empty
  if (filteredItems.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></span>
        <span className="ml-3 text-lg">Loading items...</span>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 md:px-8">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map(item => (
          <div
            key={item.item_id}
            className="relative rounded-2xl shadow-lg overflow-hidden flex flex-col justify-end min-h-[340px] bg-gray-100 group transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundImage: `url(${item.item_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>
            <div className="relative z-10 p-6 flex flex-col h-full justify-end">
              <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{item.item_name}</h2>
              <p className="text-xl text-yellow-300 font-semibold mb-4 drop-shadow-lg">₹{item.item_price}</p>
              <div className="flex gap-3 items-center">
                <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition-colors duration-200">
                  Buy
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow transition-colors duration-200">
                  Add to Cart
                </button>
                <button className="w-9 h-9 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/40 transition">
                  <img src={assets.star_white} alt="star" className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopItem
