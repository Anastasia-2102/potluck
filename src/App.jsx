import useTable from './useTable.js'
import MealList from './MealList.jsx'
import './App.css'

function App() {
  const meals = useTable("meals")
  const drinks = useTable("drinks")

  return (
    <div>
      <h1>Potluck</h1>
      <p>{meals.error}</p>
      <button onClick={meals.reload}>Reload</button>
      <MealList meals={meals.data} />
      <h2>Drinks</h2>
      {drinks.data.map((drink) => <p key={drink.id} className="card">{drink.drink_name}</p>)}
    </div>
  )
}

export default App