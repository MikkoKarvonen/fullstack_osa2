import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name === newName)) {
      alert(`Nimi ${newName} on jo luettelossa.`);
    } else if (persons.some(e => e.number === newNumber)) {
      alert(`Numero ${newNumber} on jo luettelossa.`);
    } else {
      const person = { name: newName, number: newNumber}
      axios
        .post('http://localhost:3001/persons', person)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
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
      <Filter search={newSearch} change={handleSearchChange} />
      <h3>Lisää uusi</h3>
      
      <PersonForm 
        addPerson={addPerson} newName={newName} nameChange={handlePersonChange} newNumber={newNumber} numChange={handleNumberChange}
      />
      <h2>Numerot</h2>
      <Persons persons={persons} search={newSearch} />
    </div>
  )
}

export default App