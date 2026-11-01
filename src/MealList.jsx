import MealCard from './MealCard.jsx'

function MealList({ meals, onRemove, onServeMore }) {
  return (
    <div className="meals">
      {meals.map((meal) => <MealCard key={meal.id} meal={meal} onRemove={onRemove} onServeMore={onServeMore} />)}
    </div>
  )
}

export default MealList