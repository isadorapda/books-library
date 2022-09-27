import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './screens/Home'
import { Favorites } from './screens/Favorites'
import { RandomBook } from './screens/RandomBook'
import './GlobalStyling/GlobalStyle.css'
import Search from './screens/Search'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="search-book" element={<Search />} />
      <Route path="random-book" element={<RandomBook />} />
      <Route path="favorites" element={<Favorites />} />
    </Routes>
  )
}

export default App
