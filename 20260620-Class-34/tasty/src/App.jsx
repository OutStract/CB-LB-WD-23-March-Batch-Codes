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
    const result = localStorage.getItem('isDark')
    if(result === null) {
      return false
    }
    console.log("LOCAL STORAGE",typeof(result))
    return JSON.parse(result)
  })

  console.log(typeof(theme))

  function toggleTheme() {
    console.log("BEFORE TOGGLE", typeof(theme))
    setTheme(prev => !prev)
    console.log("AFTER TOGGLE", typeof(theme))
  }

  useEffect(() => {
    localStorage.setItem('isDark', theme)
    console.log("SETTING LOCAL STORAGE",typeof(theme))
  },[theme])


// For some reason, when reloading the site, theme adds ///// in the local storage
// After 21 reload the app crashes reaching local storage limits
// It also makes it annoying to switch to dark mode, because then user has to click 


  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])


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
