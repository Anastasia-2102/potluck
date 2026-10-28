function MealCard({ meal }) {
 return (
  <div className="card">
   <h2>{meal.meal_name}</h2>
   <p>Brought by {meal.guest_name}</p>
  </div>
 )
}

export default MealCard