import React, { useContext } from 'react'
import Login from '../components/Login'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Profile = () => {
  const { token, user, logout } = useContext(ShopContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  if (token) {
    return (
      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with user name */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 px-8 py-6 flex flex-row justify-between">
            <h1 className="text-3xl font-bold text-white">{user.name}'s Profile</h1>
            <button className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm' onClick={() => handleLogout()}>Logout</button>
          </div>

          {/* Profile content */}
          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <p className="text-lg font-medium text-gray-800">{user.name}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="text-lg font-medium text-gray-800">{user.email}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Phone Number</label>
                  <p className="text-lg font-medium text-gray-800">
                    {user.phoneNumber || 'Not provided'}
                  </p>
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Delivery Address</h2>
                <div>
                  <label className="text-sm text-gray-500">Current Address</label>
                  <p className="text-lg font-medium text-gray-800">
                    {user.address || 'No address added'}
                  </p>
                </div>

                {/* Update buttons */}
                <div className="pt-4 space-y-3">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Update Profile
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            {/* Order History Section */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
              <div className="text-gray-600">
                No orders yet
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <div className='bg-[#FFDCDC] rounded-md'>
      <Login />
    </div>
  )
}

export default Profile
