import useTable from './useTable.js'
import MealCard from './MealCard.jsx'
import './App.css'

function App() {
  const { data } = useTable("meals")

  return (
    <div>
      <h1>Potluck</h1>
      {data.map((meal) => <MealCard key={meal.id} meal={meal} />)}
    </div>
  )
}

export default App