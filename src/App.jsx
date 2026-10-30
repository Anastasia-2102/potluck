import useTable from './useTable.js'
import { supabase } from './utils/supabase'
import MealList from './MealList.jsx'
import './App.css'

function App() {
  const { data, error, reload } = useTable("meals")
  const drinks = useTable("drinks")
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
    console.log(result.error.message)
    return
  }
  console.log(result.data)
  form.reset()
  reload()
}

  return (
    <div>
      <h1>Potluck</h1>
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
      <p>{error}</p>
      <button onClick={reload}>Reload</button>
      <MealList meals={data} />
      <h2>Drinks</h2>
      {drinks.data.map((drink) => <p key={drink.id} className="card">{drink.drink_name}</p>)}
    </div>
  )
}

export default App