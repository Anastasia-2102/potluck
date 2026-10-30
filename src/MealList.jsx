import MealCard from './MealCard.jsx'

function MealList({ meals, onRemove }) {
  return (
    <div>
      {meals.map((meal) => <MealCard key={meal.id} meal={meal} onRemove={onRemove} />)}
    </div>
  )
}

export default MealList