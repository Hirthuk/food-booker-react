import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Shops from '../components/Shops'

const AllItems = () => {
  const { searchWord, itemList } = useContext(ShopContext)

  if(searchWord.length == 0){
    return <Shops/>
  }
  const filteredItems = Array.isArray(itemList) 
    ? itemList.filter((item) => 
        item.item_name.toLowerCase().includes(searchWord.toLowerCase()) ||
        String(item.item_price).includes(searchWord) 
      )
    : []
  if(filteredItems.length === 0){
    return (
      <main className="flex flex-col justify-center items-center min-h-[40vh] bg-white rounded-xl shadow-md">
        <svg
          className="w-16 h-16 text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
          />
        </svg>
        <h1 className="text-2xl font-semibold text-gray-700 mb-2">No items found</h1>
        <p className="text-gray-500 text-base px-3">We couldn't find anything matching your search.</p>
      </main>
    )
  }
  if (!Array.isArray(itemList)) {
    return (
      <main className='flex justify-center items-center min-h-[40vh]'>
        <span className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></span>
        <span className='ml-3 text-lg'>Loading Items...</span>
      </main>
    )
  }

  return (
    <main className='max-w-7xl mx-auto py-10 px-2 md:px-8'>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <div
            key={item.item_id}
            className='relative rounded-2xl shadow-xl overflow-hidden flex flex-col justify-end min-h-[320px] bg-gray-100 group transition-all duration-300 hover:scale-105 hover:shadow-2xl'
            style={{
              backgroundImage: `url(${item.item_url})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>
            <div className='relative z-10 p-6 flex flex-col h-full justify-end'>
              <h2 className='text-xl font-bold text-white mb-2 drop-shadow'>{item.item_name}</h2>
              <p className='text-orange-300 font-bold text-lg mb-4 drop-shadow'>₹{item.item_price}</p>
              <div className='flex flex-row gap-3'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition w-fit focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Buy
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition w-fit focus:outline-none focus:ring-2 focus:ring-orange-400">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default AllItems
