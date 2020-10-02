import React from 'react'

const CountriesList = ({ countries, setCountries }) => (
  <table>
    <tbody>
      {countries.map(country => (
        <tr key={country.cioc}>
          <td>{country.name}</td>
          <td><button onClick={() => setCountries([country])} >Show</button></td>
        </tr>
      ))}
    </tbody>
  </table>
)
  
export default CountriesList
