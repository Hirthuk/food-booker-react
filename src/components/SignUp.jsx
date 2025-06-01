import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const SignUp = () => {
  const navigate = useNavigate()
  const { setToken, backendURL, setUser } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    try {
      const { confirmPassword, ...signupData } = formData
      const result = await axios.post(
        `${backendURL}/api/users/registeruser`,
        signupData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (result.data.success) {
        // Store token and user data
        setToken(result.data.token)
        setUser(result.data.user)
        
        // Show success message
        toast.success(`Welcome ${result.data.user.name}!`)
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
        
        // Navigate to home
        navigate('/')
      }
    } catch (error) {
      console.error('Signup error:', error)
      const errorMessage = error.response?.data?.message || 'Registration failed'
      toast.error(errorMessage)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-[80vh] px-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>
        <h2 className='text-3xl font-bold text-center mb-8 text-gray-800'>Create Account</h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
              Full Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
              placeholder='Enter your full name'
            />
          </div>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
              Email Address
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
              placeholder='Enter your email'
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
              placeholder='Create a password'
            />
          </div>
          <div>
            <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700 mb-2'>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
              placeholder='Confirm your password'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium'
          >
            Create Account
          </button>
        </form>
        <p className='mt-6 text-center text-gray-600'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-600 hover:text-blue-800 font-medium'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp