import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState('')
  const [style, setStyle] = useState('')

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
          changeMessage(`${newName} numero vaihdettiin.`, `change`);
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
          changeMessage(`${person.name} lisättiin.`, `add`);
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (e) => {
    const personToDelete = persons.find(p => p.id === e).name
    const deletePerson = window.confirm(`Poistetaanko ${personToDelete}?`);
    if (deletePerson){
    personService
      .remove(e)
      .then(response => {
        setPersons(persons.filter((i)=> i.id!==e));
        changeMessage(`${personToDelete} poistettiin.`, `remove`);
      })
    }
  }

  const changeMessage = (msg, style) => {
    setMessage(msg)
    setStyle(style)
    setTimeout(() => {
      setMessage(null)
      setStyle(null)
    }, 5000)
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
      <Notification message={message} style={style}/>
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