function MealCard({ meal, onRemove, onServeMore }) {
  const remove = () => {
    onRemove(meal.id)
  }

  const serveMore = () => {
    onServeMore(meal)
  }

  return (
    <div className="card">
      <h2>{meal.meal_name}</h2>
      <p>Brought by {meal.guest_name}</p>
      <p>Serves {meal.serves}</p>
      <button onClick={serveMore}>+1</button>
      <button onClick={remove}>Remove</button>
    </div>
  )
}

export default MealCard