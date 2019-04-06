import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const rows = () => persons.map((person,i) => <p key={i}>{person.name}</p>)

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name === newName)) {
      alert(`${newName} on jo luettelossa.`);
    } else {
      const person = { name: newName}
      const personsNew = [...persons]
      personsNew.push(person)
      setPersons(personsNew)
    }
    setNewName('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form  onSubmit={addPerson}>
        <div>
          nimi: <input value={newName}
          onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {rows()}
    </div>
  )

}

export default App