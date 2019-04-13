import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name === newName)) {
      const updatePerson = window.confirm(`${newName} on jo luettelossa. Korvataanko vanha numero uudella?`);
      if (updatePerson){
        const newId = persons.find(e => e.name === newName).id
        const person = {id: newId,  name: newName, number: newNumber}
        personService
        .update(person)
        .then(response => {
          setPersons(persons.filter((i)=> i.id!==newId).concat(response.data));
        })
      }
    } else if (persons.some(e => e.number === newNumber)) {
      alert(`Numero ${newNumber} on jo luettelossa.`);
    } else {
      const person = { name: newName, number: newNumber}
      personService
        .create(person)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (e) => {
    const deletePerson = window.confirm(`Poistetaanko ${persons.find(p => p.id === e).name}?`);
    if (deletePerson){
    personService
      .remove(e)
      .then(response => {
        setPersons(persons.filter((i)=> i.id!==e));
      })
    }
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
      <Filter search={newSearch} change={handleSearchChange}/>
      <h3>Lisää uusi</h3>
      
      <PersonForm 
        addPerson={addPerson} newName={newName} nameChange={handlePersonChange} newNumber={newNumber} numChange={handleNumberChange}
      />
      <h2>Numerot</h2>
      <Persons persons={persons} search={newSearch} remove={removePerson.bind(this)}/>
    </div>
  )
}

export default App