import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Layout from './components/Layout'
import RecipeDetail from './pages/RecipeDetail'

function App() {

  const noToggle = () => {}
  const isFavorite = () => false

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='browse' element={<Browse />} />
          <Route path='recipe/:id' element={<RecipeDetail isFavorite={isFavorite} toggleFavorite={noToggle} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
