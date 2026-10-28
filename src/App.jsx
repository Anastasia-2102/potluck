import { useState } from 'react'
import { supabase } from './utils/supabase'
import MealCard from './MealCard.jsx'
import './App.css'

function App() {
  const [meals, setMeals] = useState([])

  const loadMeals = async () => {
    const { data, error } = await supabase.from("meals").select()
    if (error) {
      console.log(error.message)
      return
    }

    setMeals(data)
  }

  return (
    <div>
      <h1>Potluck</h1>
      <button onClick={loadMeals}>Load</button>
      {meals.map((meal) => <MealCard key={meal.id} meal={meal} />)}
    </div>
  )
}

export default App