import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
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

  // Fetch user data when token changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await axios.get(`${backendURL}/api/users/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setUser(response.data.user)
        } catch (error) {
          console.error('Error fetching user data:', error)
          if (error.response?.status === 401) {
            // Token is invalid or expired
            localStorage.removeItem('token')
            setToken(null)
            setUser(null)
          }
        }
      }
    }

    fetchUserData()
  }, [token])

  const logout = () => {
    setToken(null);
    setUser({});
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const getItemList = async () => {
    try {
      // Remove double slash by using proper URL construction
      const url = new URL('/api/shops/getShopItems', backendURL).href;
      const result = await axios.get(url);
      setItemList(result.data.result);
    } catch (error) {
      console.error('Error fetching items:', error);
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
    logout
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}