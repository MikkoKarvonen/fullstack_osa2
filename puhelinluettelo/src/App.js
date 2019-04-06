import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const rows = () => persons.map((person,i) => (person.name.toLowerCase().includes(newSearch.toLowerCase())) ? <p key={i}>{person.name} {person.number}</p> : '')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name === newName)) {
      alert(`Nimi ${newName} on jo luettelossa.`);
    } else if (persons.some(e => e.number === newNumber)) {
      alert(`Numero ${newNumber} on jo luettelossa.`);
    } else {
      const person = { name: newName, number: newNumber}
      const personsNew = [...persons]
      personsNew.push(person)
      setPersons(personsNew)
    }
    setNewName('')
    setNewNumber('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <div>
        rajaa näytettäviä <input value={newSearch} onChange={handleSearchChange}/>
      </div>
      <h3>Lisää uusi</h3>
      <form  onSubmit={addPerson}>
        <div>
          nimi: <input value={newName}
          onChange={handlePersonChange} />
        </div>
        <div>
          numero: <input value={newNumber}
          onChange={handleNumberChange} />
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