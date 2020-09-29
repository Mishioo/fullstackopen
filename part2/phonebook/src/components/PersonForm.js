import React from 'react'

const PersonForm = ({
  newName,
  newNumber,
  persons,
  setPersons,
  setNewName,
  setNewNumber,
}) => {

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


  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={nameChanged} placeholder="New contact name"/>
      </div>
      <div>
        number: <input value={newNumber} onChange={numberChanged} placeholder="New contact number"/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm