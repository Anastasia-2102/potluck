import MealCard from './MealCard.jsx'

function MealList({ meals }) {
  return (
    <div>
      {meals.map((meal) => <MealCard key={meal.id} meal={meal} />)}
    </div>
  )
}

export default MealList