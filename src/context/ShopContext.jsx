import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import api from '../utils/api';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [shopOverview, setShopOverview] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  
  // Initialize state from localStorage
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {};
  });

  // Update localStorage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Update localStorage when user changes
  useEffect(() => {
    if (Object.keys(user).length > 0) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/api/users/profile');
      if (response.data?.user) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error.response?.status === 401) {
        logout();
        toast.error('Session expired. Please login again.');
      }
    }
  };

  // Effect to fetch profile on mount and token change
  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const login = async (userData) => {
    setToken(userData.token);
    setUser(userData.user);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
  };

  const logout = () => {
    setToken(null);
    setUser({});
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const getItemList = async () => {
    try {
      const response = await api.get('/api/shops/getShopItems');
      setItemList(response.data.result);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error('Failed to fetch items');
    }
  }

  useEffect(() => {
    getItemList();
  }, [])
  const value = {
    shopOverview,
    setShopOverview,
    itemList,
    searchWord,
    setSearchWord,
    backendURL,
    token,
    setToken,
    user,
    setUser,
    login,
    logout,
    fetchUserProfile
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}