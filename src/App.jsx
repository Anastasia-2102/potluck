import { useState } from 'react'
import useTable from './useTable.js'
import { supabase } from './utils/supabase'
import MealList from './MealList.jsx'
import './App.css'

function App() {
  const { data, error, reload } = useTable("meals")
  const [formError, setFormError] = useState("")
  const drinks = useTable("drinks")
  let total = 0
    data.forEach((meal) => {
    total = total + meal.serves
    })
  const addMeal = async (event) => {
    event.preventDefault()
  const form = event.target
  const result = await supabase.from("meals").insert({
    meal_name: form.mealName.value,
    guest_name: form.guestName.value,
    serves: Number(form.serves.value),
    kind_of_dish: form.kind.value,
  }).select()
    if (result.error) {
    setFormError(result.error.message)
    return
  }
  console.log(result.data)
  form.reset()
  reload()
}

    const removeMeal = async (id) => {
    const result = await supabase.from("meals").delete().eq("id", id)
    if (result.error) {
      console.log(result.error.message)
      return
    }
    reload()
  }

  const addTwo = async () => {
    console.log("addTwo clicked")
  const result = await supabase.from("meals").insert([
    { meal_name: "Rolls", guest_name: "Ana", serves: 12 },
    { meal_name: "Iced tea", guest_name: "Ben", serves: 10 },
  ])
  if (result.error) {
  console.log("Insert error:", result.error.message)
  return
}
console.log("Inserted:", result)
  reload()
}
  return (
    <div>
      <h1>Potluck</h1>
      <p>Feeds {total}</p>
      <form onSubmit={addMeal}>
        <input name="mealName" placeholder="Dish" required />
        <input name="guestName" placeholder="Your name" required />
        <input name="serves" type="number" placeholder="Serves" required />
        
        <select name="kind">
          <option>Main</option>
          <option>Side</option>
          <option>Dessert</option>
        </select>
        <button>Add</button>
      </form>
      <button onClick={addTwo}>Add two</button>
      <p>{formError}</p>
      <p>{error}</p>
      <button onClick={reload}>Reload</button>
      <MealList meals={data} onRemove={removeMeal} />
      <h2>Drinks</h2>
      {drinks.data.map((drink) => <p key={drink.id} className="card">{drink.drink_name}</p>)}
    </div>
  )
}

export default App