import { useState } from 'react'
import { supabase } from './utils/supabase'
import MealCard from './MealCard.jsx'
import './App.css'

function App() {
  const [meals, setMeals] = useState([])
  const [errorText, setErrorText] = useState("")

  const loadMeals = async () => {
    const { data, error } = await supabase.from("meals").select("id, meal_name, guest_name, serves")
    if (error) {
      setErrorText(error.message)
      return
    }

    console.log(data)
    setMeals(data)
    
  }

  return (
    <div>
      <h1>Potluck: {meals.length} dishes</h1>
      <button onClick={loadMeals}>Load</button>
      <p>{errorText}</p>
      {meals.map((meal) => <MealCard key={meal.id} meal={meal} />)}
    </div>
  )
}

export default App