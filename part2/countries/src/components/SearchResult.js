import React from 'react'
import Country from './Country'
import CountriesList from './CountriesList'

const SearchResult = ({ countries, setCountries, weather }) => {
  const num = countries.length
  if (num === 0) {
    return <p>No data available.</p>
  } else if (num === 1) {
    return <Country country={countries[0]} weather={weather} />
  } else if (1 < num && num < 11) {
    return <CountriesList countries={countries} setCountries={setCountries} />
  } else {
    return <p>Too many matches, specify another filter.</p>
  }
}

export default SearchResult
