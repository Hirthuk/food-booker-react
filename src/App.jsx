import React from 'react'
import {ToastContainer} from 'react-toastify'
import {Routes, Route} from 'react-router-dom'
import {
    Home,
    About,
    AllItems,
    Favourites,
    Contact,
    MyCart,
    Trending,
} from './pages'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import PageNotFound from './components/pagenotfound'
import ShopItem from './pages/ShopItem'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './pages/Profile'
const App = () => {
  return (
    <div className="px-2 sm:px-[2vw] md:px-[3vw] lg:px-[4vw]  mt-0">
     <ToastContainer/>
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='about' element = {<About/>}/>
        <Route path='cart' element = {<MyCart/>}/>
        <Route path='items' element= {<AllItems/>}/>
        <Route path='favourites' element= {<Favourites/>}/>
        <Route path='contact' element= {<Contact/>}/>
        <Route path='trending' element= {<Trending/>}/>
        <Route path='shop/:id' element={<ShopItem/>}/>
        <Route path='login' element = {<Login/>}/>
        <Route path='signup' element = {<Signup/>} />
        <Route path="*" element={<PageNotFound/>} />
        <Route path='profile' element = {<Profile/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
