import React from 'react'

const Person = ({ person }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
  </tr>
)

const Persons = ({ persons, filter }) => {
  console.log(persons)
  return (
    <table>
      <tbody>
        {
          persons.filter(p => p.name.includes(filter))
          .map(p => <Person key={p.name} person={p} />)
        }
      </tbody>
    </table>
  )
}

export default Persons
