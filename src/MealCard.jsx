function MealCard({ meal, onRemove }) {
  const remove = () => {
    onRemove(meal.id)
  }

  return (
    <div className="card">
      <h2>{meal.meal_name}</h2>
      <p>Brought by {meal.guest_name}</p>
      <p>Serves {meal.serves}</p>
      <button onClick={remove}>Remove</button>
    </div>
  )
}

export default MealCard