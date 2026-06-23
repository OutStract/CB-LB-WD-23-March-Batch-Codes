import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Layout from './components/Layout'
import RecipeDetail from './pages/RecipeDetail'
import Categories from './pages/Categories'
import CategoriesIndex from './pages/CategoriesIndex'
import CategoriesMeals from './pages/CategoriesMeals'
import Favorites from './pages/Favorites'

function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])

  function toggleFavorite(meal) {
    setFavorites((prev) => {
      const already = prev.some((m) => m.idMeal == meal.idMeal)
      if (already) {
        return prev.filter((m) => m.idMeal !== meal.idMeal)
      }
      // store only the fields a card needs
      return [...prev, {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb
      }]
    })
  }

  function isFavorite(id) {
    return favorites.some((m) => m.idMeal === id)
  }

  function toggleTheme() {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout favoritesCount={favorites.length} theme={theme} toggleTheme={toggleTheme}/>}>
          <Route index element={<Home />} />
          <Route path='browse' element={<Browse isFavorite={isFavorite} toggleFavorite={toggleFavorite}/>} />
          <Route path='recipe/:id' element={<RecipeDetail isFavorite={isFavorite} toggleFavorite={toggleFavorite} />} />
          <Route path='categories' element={<Categories />}>
            <Route index element={<CategoriesIndex/>} /> 
            <Route path=':categoryName' element={<CategoriesMeals isFavorite={isFavorite} toggleFavorite={toggleFavorite} />} /> 
          </Route>
          <Route path='favorites' element={<Favorites favorites={favorites} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
