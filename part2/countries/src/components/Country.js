import React from 'react'
import Weather from './Weather'

const Country = ({ country, weather }) => (
  <div>
    <h1>{country.name}</h1>
    <p>{`capital ${country.capital}`}</p>
    <p>{`population ${country.population}`}</p>
    <h3>languages</h3>
    <ul>
      {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
    </ul>
    <img src={country.flag} alt='' width="300" />
    <Weather weather={weather} />
  </div>
)
  
export default Country
