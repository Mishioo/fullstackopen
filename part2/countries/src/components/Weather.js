import React from 'react'

const Weather = ({ weather }) => {
  if (weather === '') {
    return <div className="Weather">Sorry, no weather available</div>
  } else {
    return (
      <div className="Weather">
      <h3>{`Weather in ${weather.location.name}`}</h3>
      {`${weather.current.is_day ? 'Day' : 'Night'}, ${weather.current.condition.text.toLowerCase()}`}
      <br />
      {`Temperature: ${weather.current.temp_c} `} &#8451;
      <br />
      {`Wind: ${weather.current.wind_kph} kph ${weather.current.wind_dir}`}
      </div>
    )
  }
}

export default Weather
