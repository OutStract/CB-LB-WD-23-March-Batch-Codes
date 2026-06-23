// src/pages/Favorites.jsx
import { Link } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard.jsx'

// 😖 Receives favorites + functions from App, then drills them into each RecipeCard.
function Favorites({ favorites, isFavorite, toggleFavorite }) {
  return (
    <div className="favorites">
      <style>{`
        .favorites { padding: 24px; }
        .favorites .grid {
          display: grid; gap: 18px;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
        .favorites .empty { text-align: center; padding: 60px 0; color: #616e7c; }
        .favorites .empty a { color: #ef6c4d; font-weight: 700; }
      `}</style>

      <h1>Your Favorites</h1>

      {favorites.length === 0 ? (
        <div className="empty">
          <p>No favorites yet. <Link to="/browse">Find something tasty →</Link></p>
        </div>
      ) : (
        <div className="grid">
          {favorites.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              meal={meal}
              isFavorite={isFavorite}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites