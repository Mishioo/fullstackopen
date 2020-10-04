import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(data => setPersons(data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    // use existing person to preserve other fields
    // this implementation breaks when deleted after update
    const newPerson = { name: newName, number:newNumber }
    const personExists = persons.map(p => p.name).includes(newName)
    if (
      personExists &&
      window.confirm(
        `${newName} is already added to phonebook.\n` +
        'Would you like to update this entry?'
      )
    ) {
      personsService
        .update(persons.find(p => p.name === newName).id, newPerson)
        .then(
          person => setPersons(persons.map(
            p => p.id !== person.id ? p : {...p, number:newNumber}
          ))
        )
    } else if (personExists) {
      return
    } else {
      personsService.create(newPerson)
        .then(person => setPersons(persons.concat(person)))
    }
    setNewName('')
    setNewNumber('')
}

  const deletePerson = (person) => {
    if (
      !window.confirm(`Are you sure you want to delete ${person.name}?`)
    ) { return }
    personsService.deletePerson(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
      .catch(error => {console.log('error data', error)})
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <h3>Addd new entry</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filter={filter}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
