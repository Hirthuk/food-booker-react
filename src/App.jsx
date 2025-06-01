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
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import SearchBar from './components/SearchBar.jsx'
import NotFound from './components/NotFound.jsx'
import ShopItem from './pages/ShopItem.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Profile from './pages/Profile.jsx'
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
        <Route path='signup' element = {<SignUp/>} />
        <Route path="*" element={<NotFound/>} />
        <Route path='profile' element = {<Profile/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
