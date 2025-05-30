import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const Login = () => {
  const {setToken, setUser, token} = useContext(ShopContext);
  const navigate = useNavigate();
  const {backendURL} = useContext(ShopContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${backendURL}/api/users/login`, formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (result.data.success) {
        // Store token and user data
        setToken(result.data.token);
        setUser(result.data.user);
        
        // Show success message
        toast.success(`Welcome back ${result.data.user.name}!`);
        
        // Reset form
        setFormData({
          email: '',
          password: ''
        });
        
        // Navigate to home
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
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
        <h2 className='text-3xl font-bold text-center mb-8 text-gray-800'>Welcome Back!</h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
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
              placeholder='Enter your password'
            />
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='remember'
                className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
              />
              <label htmlFor='remember' className='ml-2 block text-sm text-gray-700'>
                Remember me
              </label>
            </div>
            <Link to='/forgot-password' className='text-sm text-blue-600 hover:text-blue-800'>
              Forgot password?
            </Link>
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium'
          >
            Sign In
          </button>
        </form>
        <p className='mt-6 text-center text-gray-600'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-blue-600 hover:text-blue-800 font-medium'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
