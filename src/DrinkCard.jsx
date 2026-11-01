function DrinkCard({ drink }) {
  return (
    <div className="card">
      <h2>{drink.drink_name}</h2>
      <p>Brought by {drink.guest_name}</p>
    </div>
  )
}

export default DrinkCard