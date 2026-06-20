import { Link } from 'react-router-dom'

// Props:
// ``````
// meals -> the recipe to show
// isFavorite -> function(id) => boolean (optional)
// toggleFavorite -> function(meal) => void (optional)

function RecipeCard({ meal, isFavorite, toggleFavorite}) {
    // const mealObj = JSON.parse(meal);
    // console.log("==> meal:", typeof mealObj, mealObj);
    return (
        <div className='recipe-card'>
            <style>{`
                .recipe-card {
                    width: 100px;
                }
            `}</style>

            <Link to={`/recipe/${meal.idMeal}`} className="card-link">
                <img className='card-img' src={meal.strMealThumb} alt={meal.strMeal}/>
                <h3 className='card-title'>{meal.strMeal}</h3>
            </Link>
        </div>
    )
}

export default RecipeCard