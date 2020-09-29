import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number:newNumber }
    if (persons.map(p => p.name).includes(newPerson.name)) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(newPerson))
  }

  const nameChanged = (event) => {
    console.log('name value: ', event.target.value)
    setNewName(event.target.value)
  }
  
  const numberChanged = (event) => {
    console.log('number value: ', event.target.value)
    setNewNumber(event.target.value)
  }

  const searchFilter = (event) => {
    console.log('filter value: ', event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={filter} onChange={searchFilter} />
      </div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={nameChanged} />
        </div>
        <div>
          number: <input value={newNumber} onChange={numberChanged} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.filter(p => p.name.includes(filter)).map(p => {
            return (
              <tr key={p.name}>
                <td>{p.name}</td>
                <td>{p.number}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App
