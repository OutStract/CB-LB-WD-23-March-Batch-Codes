const BASE = 'https://www.themealdb.com/api/json/v1/1'

// Search meal by name. Returns array (empty array if not found)
export async function searchMeals(query) {
    const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.meals || []
}

// Get one full meal by id.
export async function getMealById(id) {
    const res = await fetch(`${BASE}/lookup.php?i=${id}`)
    const data = await res.json()
    return data.meals ? data.meals[0]: null
}