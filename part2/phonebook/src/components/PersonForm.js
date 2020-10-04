import React from 'react'

const PersonForm = ({
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  addPerson,
}) => {

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
        name: <input
          value={newName}
          onChange={nameChanged}
          placeholder="New contact name"
        />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={numberChanged}
          placeholder="New contact number"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm