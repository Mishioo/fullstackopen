import React from 'react'

const Person = ({ person, deletePerson }) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td><button onClick={() => deletePerson(person)} >delete</button></td>
  </tr>
)

const Persons = ({ persons, filter, deletePerson }) => {
  const lowerFilter = filter.toLowerCase()
  return (
    <table>
      <tbody>
        {
          persons.filter(p => p.name.toLowerCase().includes(lowerFilter))
            .map(p => (
              <Person
                key={p.name}
                person={p}
                deletePerson={deletePerson}
              />
            )
          )
        }
      </tbody>
    </table>
  )
}

export default Persons
