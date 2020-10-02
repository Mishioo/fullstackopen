import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import SearchResult from './components/SearchResult'

const App = ({ api_key }) => {
  const [ countries, setCountries ] = useState([])
  const [ weather, setWeather ] = useState('')
  const [ searched, setSearched ] = useState('')
  const allCountries = useRef([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        allCountries.current = response.data
        setCountries(allCountries.current)
      })
  }, [])

  useEffect(() => {
    if (countries.length === 1) {
      axios
        .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${countries[0].capital}`)
        .then(response => setWeather(response.data))
    }
  }, [countries, api_key])

  const searchedChanged = (event) => {
    setSearched(event.target.value)
    let lowerSearched = event.target.value.toLowerCase()
    setCountries(allCountries.current.filter(
      country => country.name.toLowerCase().includes(lowerSearched)
    ))
  }

  return (
    <div className="Countries">
      <p>find countries {' '}</p>
      <form>
        <input
          value={searched}
          onChange={searchedChanged}
          placeholder='type country name'
        />
      </form>
      <SearchResult
        countries={countries}
        setCountries={setCountries}
        weather={weather}
      />
    </div>
  );
}

export default App;
