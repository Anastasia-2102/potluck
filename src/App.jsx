import { useState } from 'react'
import useTable from './useTable.js'
import { supabase } from './utils/supabase'
import MealList from './MealList.jsx'
import DrinkCard from './DrinkCard.jsx'
import './App.css'

function App() {
  const { data, error, reload } = useTable("meals")
  const [formError, setFormError] = useState("")
  const [found, setFound] = useState([])
  const [firstThree, setFirstThree] = useState([])
  const [picked, setPicked] = useState([])
  const [newest, setNewest] = useState([])
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

    const addDrink = async (event) => {
    event.preventDefault()
    const form = event.target
    const result = await supabase.from("drinks").insert({
      drink_name: form.drinkName.value,
      guest_name: form.guestName.value,
    })
    if (result.error) {
      console.log(result.error.message)
      return
    }
    form.reset()
    drinks.reload()
  }

    const removeMeal = async (id) => {
    const result = await supabase.from("meals").delete().eq("id", id)
    if (result.error) {
      console.log(result.error.message)
      return
    }
    reload()
  }

    const addServing = async (meal) => {
    const result = await supabase.from("meals").update({ serves: meal.serves + 1 }).eq("id", meal.id)
    if (result.error) {
      console.log(result.error.message)
      return
    }
    reload()
  }

  const showAnas = async () => {
    const result = await supabase.from("meals").select().eq("guest_name", "Ana")
    if (result.error) {
      console.log(result.error.message)
      return
    }
    setPicked(result.data)
  }

  const pickGuest = async (event) => {
    event.preventDefault()
  const form = event.target
  const result = await supabase.from("meals").select().eq("guest_name", form.guest.value)
  if (result.error) {
    console.log(result.error.message)
    return
  }
  setPicked(result.data)
}

  const search = async (event) => {
  event.preventDefault()
  const form = event.target
  const result = await supabase.from("meals").select().ilike("meal_name", "%" + form.query.value + "%")
  if (result.error) {
    console.log(result.error.message)
    return
  }
  setFound(result.data)
}

  const showNewest = async () => {
    const result = await supabase.from("meals").select().order("created_at", { ascending: false })
    if (result.error) {
      console.log(result.error.message)
      return
    }
    setNewest(result.data)
  }

  const showFirstThree = async () => {
  const result = await supabase.from("meals").select().limit(3)
  if (result.error) {
    console.log(result.error.message)
    return
  }
  setFirstThree(result.data)
}

  const anas = data.filter((meal) => meal.guest_name === "Ana")

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
      <br />
        {formError && <p>{formError}</p>}
        {error && <p>{error}</p>}

      <button onClick={reload}>Reload</button>
    <form onSubmit={search}>
        <input name="query" placeholder="Search dishes" />
        <button>Search</button>
    </form>
        <MealList meals={found} onRemove={removeMeal} onServeMore={addServing} />
      <h2>Three dishes</h2>
      <button onClick={showFirstThree}>Show three</button>
      <MealList meals={firstThree} onRemove={removeMeal} />
      
      <button onClick={showNewest}>Newest first</button>
      <MealList meals={newest} onRemove={removeMeal} />
      <MealList meals={data} onRemove={removeMeal} onServeMore={addServing} />
      <h2>Ana's dishes</h2>
      <p>Ana brought {anas.length} dishes</p>
      <MealList meals={anas} onRemove={removeMeal} />
      <button onClick={showAnas}>Ask the table</button>
      <form onSubmit={pickGuest}>
        <select name="guest">
          <option>Ana</option>
          <option>Ben</option>
          <option>Chloe</option>
        </select>
      <button>Show</button>
      </form>
      <MealList meals={picked} onRemove={removeMeal} />
      <h2>Drinks</h2>
      <form onSubmit={addDrink}>
        <input name="drinkName" placeholder="Drink" />
        <input name="guestName" placeholder="Your name" />
        <button>Add</button>
      </form>
      <div className="meals">
  {drinks.data.map((drink) => <DrinkCard key={drink.id} drink={drink} />)}
    </div>
      <footer>
        <p>© 2026 Potluck App</p>
      </footer>
    </div>
  )
}

export default App