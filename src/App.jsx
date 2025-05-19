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
import { assets } from './assets/assest'
const App = () => {
  return (
    <div className={`px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-svh bg-cover bg-no-repeat`} style={{ backgroundImage: `url(${assets.Hero_Backgroundimage})` }}>
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
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
