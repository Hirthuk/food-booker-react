import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [shopOverview, setShopOverview] = useState([]);
  const [itemList, setItemList] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
 
  const getItemList = async () => {
    try{
      let result = await axios.get(backendURL+'/api/shops/getShopItems');
      setItemList(result.data.result);
      // console.log(result.data);
    }
    catch(error){
      console.log(error.message);
    }
  }

  useEffect(() => {
    getItemList();
  }, [])
  const value = {
    shopOverview,
    setShopOverview,
    itemList
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}